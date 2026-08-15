import { useRef, useMemo, useEffect, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  uniform vec2 uResolution;
  uniform vec2 uMouse;
  varying vec2 vUv;

  float map(vec3 p) {
      float t = uTime * 0.08; 
      vec2 pos = p.xz;
      
      // Mouse parallax
      pos += uMouse * 0.3;

      float angle = 0.6;
      mat2 rot = mat2(cos(angle), -sin(angle), sin(angle), cos(angle));
      pos = rot * pos;
      
      float wave = sin(pos.x * 0.5 + t) * 1.0;
      wave += sin(pos.x * 1.3 - t * 0.7 + pos.y * 0.4) * 0.5;
      wave += cos(pos.x * 2.1 + pos.y * 1.8 + t * 1.2) * 0.15;
      
      return p.y - wave;
  }

  vec3 calcNormal(vec3 p) {
      const float h = 0.005;
      const vec2 k = vec2(1, -1);
      return normalize( k.xyy*map( p + k.xyy*h ) +
                        k.yyx*map( p + k.yyx*h ) +
                        k.yxy*map( p + k.yxy*h ) +
                        k.xxx*map( p + k.xxx*h ) );
  }

  float calcSoftshadow(vec3 ro, vec3 rd, float mint, float tmax) {
      float res = 1.0;
      float t = mint;
      for( int i=0; i<30; i++ ) {
          float h = map( ro + rd*t );
          res = min( res, 8.0*h/t );
          t += clamp( h, 0.02, 0.12 );
          if( res<0.001 || t>tmax ) break;
      }
      return clamp( res, 0.0, 1.0 );
  }

  float calcAO(vec3 pos, vec3 nor) {
      float occ = 0.0;
      float sca = 1.0;
      for( int i=0; i<5; i++ ) {
          float hr = 0.01 + 0.12*float(i)/4.0;
          vec3 aopos =  nor * hr + pos;
          float dd = map( aopos );
          occ += -(dd-hr)*sca;
          sca *= 0.95;
      }
      return clamp( 1.0 - 3.0*occ, 0.0, 1.0 );
  }

  vec3 ACESFilm(vec3 x) {
      float a = 2.51;
      float b = 0.03;
      float c = 2.43;
      float d = 0.59;
      float e = 0.14;
      return clamp((x*(a*x+b))/(x*(c*x+d)+e), 0.0, 1.0);
  }

  void main() {
    vec2 p = (vUv - 0.5) * 2.0;
    p.x *= uResolution.x / uResolution.y;

    vec3 ro = vec3(0.0, 3.5, 4.0);
    vec3 rd = normalize(vec3(p.x, p.y - 0.6, -1.5));

    float t = 0.0;
    float tmax = 25.0;
    for(int i=0; i<90; i++) {
        vec3 pos = ro + rd * t;
        float h = map(pos);
        if(abs(h) < 0.001 || t > tmax) break;
        t += h;
    }

    vec3 colorBase = vec3(0.20, 0.18, 0.16);
    vec3 color = colorBase;

    if(t < tmax) {
        vec3 pos = ro + rd * t;
        vec3 normal = calcNormal(pos);
        vec3 viewDir = normalize(ro - pos);

        vec3 lightPos1 = vec3(-4.0, 6.0, 3.0);
        vec3 lightDir1 = normalize(lightPos1 - pos);
        vec3 lightPos2 = vec3(5.0, 2.0, 4.0);
        vec3 lightDir2 = normalize(lightPos2 - pos);

        float shadow = calcSoftshadow(pos, lightDir1, 0.05, 10.0);
        float ao = calcAO(pos, normal);
        float rim = pow(1.0 - max(dot(normal, viewDir), 0.0), 3.0);

        float diff1 = clamp(dot(normal, lightDir1), 0.0, 1.0);
        float diff2 = clamp(dot(normal, lightDir2), 0.0, 1.0);

        vec3 albedoShadow = vec3(0.65, 0.58, 0.52);
        vec3 albedoMid = vec3(0.86, 0.81, 0.75);
        vec3 albedoHighlight = vec3(0.96, 0.94, 0.92);

        vec3 albedo = mix(albedoShadow, albedoMid, smoothstep(-0.8, 0.2, pos.y));
        albedo = mix(albedo, albedoHighlight, smoothstep(0.2, 1.0, pos.y));

        vec3 lin = vec3(0.0);
        lin += diff1 * vec3(1.0, 0.98, 0.95) * shadow * ao * 1.3;
        lin += diff2 * vec3(0.85, 0.75, 0.65) * ao * 0.4;
        lin += vec3(0.40, 0.38, 0.35) * ao * 0.4;

        color = albedo * lin;
        color += vec3(0.8, 0.75, 0.7) * rim * ao * 0.25;

        float fog = 1.0 - exp(-0.02 * t * t);
        color = mix(color, colorBase, fog);
    }

    color = ACESFilm(color);
    float vignette = smoothstep(1.8, 0.3, length(vUv - 0.5));
    color *= mix(0.7, 1.0, vignette);

    // Base cinematic grain
    float baseGrain = fract(sin(dot(vUv.xy, vec2(12.9898,78.233))) * 43758.5453123) * 0.08;
    color -= baseGrain;

    gl_FragColor = vec4(color, 1.0);
  }
`

const ShaderMesh = ({ isVisible }) => {
  const materialRef = useRef()

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uResolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
      uMouse: { value: new THREE.Vector2(0, 0) }
    }),
    []
  )

  const targetMouse = useRef({ x: 0, y: 0 })
  const currentMouse = useRef(new THREE.Vector2(0, 0))

  useFrame((state, delta) => {
    if (!isVisible) return
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = state.clock.getElapsedTime()
      currentMouse.current.lerp(targetMouse.current, 0.05)
      materialRef.current.uniforms.uMouse.value.copy(currentMouse.current)
    }
  })

  useEffect(() => {
    const handleResize = () => {
      if (materialRef.current) {
        materialRef.current.uniforms.uResolution.value.set(window.innerWidth, window.innerHeight)
      }
    }
    const handleMouseMove = (e) => {
      targetMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1
      targetMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1
    }

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('resize', handleResize)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <mesh>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function HeroShader() {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        setIsVisible(false)
      } else {
        setIsVisible(true)
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        backgroundColor: '#332E29',
        visibility: isVisible ? 'visible' : 'hidden',
        pointerEvents: isVisible ? 'auto' : 'none'
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 1] }}
        style={{ width: '100%', height: '100%', display: 'block' }}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false
        }}
        dpr={[1, 1.5]}
      >
        <ShaderMesh isVisible={isVisible} />
      </Canvas>
    </div>
  )
}


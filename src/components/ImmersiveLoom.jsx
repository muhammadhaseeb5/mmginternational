import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  uniform float uTime;
  uniform vec2 uPointer;
  varying vec2 vUv;
  varying float vWave;

  void main() {
    vUv = uv;
    vec3 p = position;
    float waveA = sin((p.y * 2.35) + uTime * 1.15) * 0.16;
    float waveB = cos((p.x * 2.8) - uTime * 0.82) * 0.09;
    float edge = sin(uv.x * 3.14159);
    p.z += (waveA + waveB) * edge;
    p.x += uPointer.x * (uv.y - .5) * .16;
    p.y += uPointer.y * (uv.x - .5) * .12;
    vWave = p.z;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  }
`

const fragmentShader = `
  uniform float uTime;
  varying vec2 vUv;
  varying float vWave;

  float circle(vec2 uv, vec2 p, float r) {
    return 1.0 - smoothstep(r, r + .012, length(uv - p));
  }

  void main() {
    vec3 deep = vec3(.022, .145, .123);
    vec3 jade = vec3(.055, .31, .25);
    vec3 gold = vec3(.76, .56, .24);
    vec3 ivory = vec3(.91, .86, .72);

    float threads = sin(vUv.x * 255.0) * sin(vUv.y * 210.0) * .025;
    float diagonal = smoothstep(.48, .52, sin((vUv.x + vUv.y * .5) * 25.0 + uTime * .2));
    float blooms = circle(vUv, vec2(.25,.72), .095) + circle(vUv, vec2(.76,.31), .12);
    float petals = circle(vUv, vec2(.18,.64), .035) + circle(vUv, vec2(.32,.66), .03)
      + circle(vUv, vec2(.69,.22), .04) + circle(vUv, vec2(.83,.22), .035);

    vec3 color = mix(deep, jade, vUv.y + vWave * .3);
    color = mix(color, gold, diagonal * .16);
    color = mix(color, gold, clamp(blooms, 0.0, 1.0) * .78);
    color = mix(color, ivory, clamp(petals, 0.0, 1.0) * .85);
    color += threads;
    float edgeLight = pow(abs(vUv.x - .5) * 2.0, 3.0);
    color += vec3(.18,.12,.03) * edgeLight;
    gl_FragColor = vec4(color, 1.0);
  }
`

export default function ImmersiveLoom() {
  const mountRef = useRef(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return undefined

    let renderer
    let frameId
    let resizeObserver
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    try {
      const scene = new THREE.Scene()
      const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100)
      camera.position.set(0, 0, 8.4)

      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' })
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.7))
      renderer.outputColorSpace = THREE.SRGBColorSpace
      mount.appendChild(renderer.domElement)

      const group = new THREE.Group()
      group.rotation.set(-0.04, -0.2, -0.08)
      scene.add(group)

      const uniforms = {
        uTime: { value: 0 },
        uPointer: { value: new THREE.Vector2(0, 0) },
      }
      const fabric = new THREE.Mesh(
        new THREE.PlaneGeometry(4.2, 5.1, 48, 60),
        new THREE.ShaderMaterial({
          uniforms,
          vertexShader,
          fragmentShader,
          side: THREE.DoubleSide,
        }),
      )
      fabric.rotation.z = -0.13
      group.add(fabric)

      const ringMaterial = new THREE.MeshBasicMaterial({ color: 0xd2ae61, transparent: true, opacity: 0.62 })
      const ring = new THREE.Mesh(new THREE.TorusGeometry(2.58, 0.022, 12, 140), ringMaterial)
      ring.rotation.set(1.17, 0.18, -0.18)
      ring.position.set(0.2, 0, -0.6)
      group.add(ring)

      const ringTwo = new THREE.Mesh(new THREE.TorusGeometry(2.08, 0.012, 10, 120), ringMaterial.clone())
      ringTwo.material.opacity = 0.28
      ringTwo.rotation.set(1.28, -0.4, 0.12)
      ringTwo.position.set(-0.35, 0.2, -0.9)
      group.add(ringTwo)

      const particleGeometry = new THREE.BufferGeometry()
      const particlePositions = new Float32Array(105 * 3)
      for (let i = 0; i < 105; i += 1) {
        const radius = 2.8 + Math.random() * 2.8
        const angle = Math.random() * Math.PI * 2
        particlePositions[i * 3] = Math.cos(angle) * radius
        particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 6.8
        particlePositions[i * 3 + 2] = (Math.random() - 0.5) * 2.5 - 1
      }
      particleGeometry.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3))
      const particles = new THREE.Points(
        particleGeometry,
        new THREE.PointsMaterial({ color: 0xe7c980, size: 0.025, transparent: true, opacity: 0.62 }),
      )
      scene.add(particles)

      const pointer = new THREE.Vector2(0, 0)
      const onPointerMove = (event) => {
        const rect = mount.getBoundingClientRect()
        pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
        pointer.y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
      }
      mount.addEventListener('pointermove', onPointerMove, { passive: true })

      const setSize = () => {
        const width = Math.max(mount.clientWidth, 1)
        const height = Math.max(mount.clientHeight, 1)
        camera.aspect = width / height
        camera.updateProjectionMatrix()
        renderer.setSize(width, height, false)
      }
      setSize()
      resizeObserver = new ResizeObserver(setSize)
      resizeObserver.observe(mount)

      const timer = new THREE.Timer()
      timer.connect(document)

      const render = (timestamp) => {
        timer.update(timestamp)
        const elapsed = timer.getElapsed()
        uniforms.uTime.value = prefersReducedMotion ? 0 : elapsed
        uniforms.uPointer.value.lerp(pointer, prefersReducedMotion ? 1 : 0.035)
        if (!prefersReducedMotion) {
          group.rotation.y += ((-0.2 + pointer.x * 0.12) - group.rotation.y) * 0.025
          group.rotation.x += ((-0.04 - pointer.y * 0.07) - group.rotation.x) * 0.025
          ring.rotation.z = elapsed * 0.045
          ringTwo.rotation.z = -elapsed * 0.035
          particles.rotation.y = elapsed * 0.018
        }
        renderer.render(scene, camera)
        if (!prefersReducedMotion) frameId = requestAnimationFrame(render)
      }
      render()

      return () => {
        cancelAnimationFrame(frameId)
        resizeObserver?.disconnect()
        mount.removeEventListener('pointermove', onPointerMove)
        timer.dispose()
        scene.traverse((object) => {
          object.geometry?.dispose()
          if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose())
          else object.material?.dispose()
        })
        renderer.dispose()
        renderer.domElement.remove()
      }
    } catch {
      mount.dataset.webglFallback = 'true'
    }

    return () => {
      cancelAnimationFrame(frameId)
      resizeObserver?.disconnect()
      renderer?.dispose()
      renderer?.domElement?.remove()
    }
  }, [])

  return <div ref={mountRef} className="absolute inset-0" aria-hidden="true" />
}

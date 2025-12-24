// Import Three.js library
const THREE = window.THREE || require("three")

let scene, camera, renderer
let particles

function initThreeScene() {
  const container = document.getElementById("three-container")
  if (!container) return

  // Scene setup
  scene = new THREE.Scene()
  camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true })

  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.setPixelRatio(window.devicePixelRatio)
  container.appendChild(renderer.domElement)

  camera.position.z = 50

  // Create particles
  const geometry = new THREE.BufferGeometry()
  const particleCount = 150
  const positionArray = new Float32Array(particleCount * 3)

  for (let i = 0; i < particleCount * 3; i += 3) {
    positionArray[i] = (Math.random() - 0.5) * 200
    positionArray[i + 1] = (Math.random() - 0.5) * 200
    positionArray[i + 2] = (Math.random() - 0.5) * 200
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positionArray, 3))

  const material = new THREE.PointsMaterial({
    size: 2,
    color: 0x00d4ff,
    transparent: true,
    opacity: 0.8,
    sizeAttenuation: true,
  })

  particles = new THREE.Points(geometry, material)
  scene.add(particles)

  // Mouse interaction
  let mouseX = 0
  let mouseY = 0

  document.addEventListener("mousemove", (e) => {
    mouseX = (e.clientX / window.innerWidth) * 2 - 1
    mouseY = -(e.clientY / window.innerHeight) * 2 + 1
  })

  // Animation loop
  function animate() {
    requestAnimationFrame(animate)

    if (particles) {
      particles.rotation.x += 0.0001
      particles.rotation.y += 0.0003

      // Mouse interaction
      particles.rotation.x += mouseY * 0.0001
      particles.rotation.y += mouseX * 0.0001

      // Particle movement
      const positionAttribute = geometry.getAttribute("position")
      const positions = positionAttribute.array

      for (let i = 1; i < particleCount * 3; i += 3) {
        positions[i] += Math.sin(Date.now() * 0.0001 + i) * 0.05
      }

      positionAttribute.needsUpdate = true
    }

    renderer.render(scene, camera)
  }

  animate()

  // Handle window resize
  window.addEventListener("resize", onWindowResize)
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()
  renderer.setSize(window.innerWidth, window.innerHeight)
}

// Initialize when page loads
window.addEventListener("load", initThreeScene)

// Fallback initialization
setTimeout(() => {
  if (!scene) {
    initThreeScene()
  }
}, 100)

// Smooth scroll behavior for nav links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Active nav link on scroll
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect()
    const sectionId = section.getAttribute("id")

    if (rect.top <= 100 && rect.bottom > 100) {
      navLinks.forEach((link) => {
        link.style.color = "var(--accent-secondary)"
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.style.color = "var(--accent-gold)"
        }
      })
    }
  })
})

// Scroll reveal animations
const revealElements = document.querySelectorAll(
  ".category-card, .project-card, .education-card, .certifications-card, .stat-item, .timeline-content",
)

const revealOptions = {
  threshold: 0.15,
  rootMargin: "0px 0px -100px 0px",
}

const revealOnScroll = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("reveal")
      revealOnScroll.unobserve(entry.target)
    }
  })
}, revealOptions)

revealElements.forEach((element) => {
  revealOnScroll.observe(element)
})

// Parallax effect on hero image
const profileImage = document.querySelector(".profile-image")

document.addEventListener("mousemove", (e) => {
  if (profileImage && profileImage.parentElement) {
    const rect = profileImage.parentElement.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    profileImage.parentElement.style.transform = `perspective(1000px) rotateX(${y * 0.05}deg) rotateY(${x * 0.05}deg)`
  }
})

// Magnetic hover effect on buttons and links
const magneticElements = document.querySelectorAll(".btn, .project-link, .social-icon")

magneticElements.forEach((element) => {
  element.addEventListener("mousemove", (e) => {
    const rect = element.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    element.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`
  })

  element.addEventListener("mouseleave", () => {
    element.style.transform = "translate(0, 0)"
  })
})

// Performance optimizations
let ticking = false

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      ticking = false
    })
    ticking = true
  }
})

console.log("[v0] Dark theme portfolio loaded successfully!")

import React, { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext'
import { translations } from '../translations'
import './Home.css'

const Home = () => {
  const { language } = useLanguage()
  const t = translations[language].home
  const galleryContainerRef = useRef(null)
  const phoneGalleryRef = useRef(null)

  const scrollGallery = (direction) => {
    if (galleryContainerRef.current) {
      const scrollAmount = 350
      galleryContainerRef.current.scrollBy({
        left: direction * scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  const scrollPhoneGallery = (direction) => {
    if (phoneGalleryRef.current) {
      const container = phoneGalleryRef.current
      const scrollAmount = 202.5 // 187.5px width + 15px gap
      const currentScroll = container.scrollLeft
      const targetScroll = currentScroll + (direction * scrollAmount)
      
      container.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      })
      
      // 滚动后更新中间屏幕
      setTimeout(() => {
        updateCenterPhone()
      }, 100)
    }
  }

  const updateCenterPhone = () => {
    if (phoneGalleryRef.current) {
      const container = phoneGalleryRef.current
      const phoneMockups = container.querySelectorAll('.phone-mockup')
      
      phoneMockups.forEach((mockup) => {
        const rect = mockup.getBoundingClientRect()
        const containerRect = container.getBoundingClientRect()
        const centerX = containerRect.left + containerRect.width / 2
        const mockupCenterX = rect.left + rect.width / 2
        const distance = Math.abs(centerX - mockupCenterX)
        const maxDistance = containerRect.width / 2 + 100
        
        if (distance < 150) {
          // 中间的屏幕
          mockup.style.transform = 'scale(1.15)'
          mockup.style.opacity = '1'
          mockup.style.zIndex = '2'
        } else {
          // 两侧的屏幕
          const scale = Math.max(0.85, 1 - (distance / maxDistance) * 0.3)
          const opacity = Math.max(0.6, 1 - (distance / maxDistance) * 0.4)
          mockup.style.transform = `scale(${scale})`
          mockup.style.opacity = opacity
          mockup.style.zIndex = '1'
        }
      })
    }
  }

  // 初始化时设置中间屏幕
  useEffect(() => {
    if (phoneGalleryRef.current) {
      const container = phoneGalleryRef.current
      // 初始化时滚动到中间
      setTimeout(() => {
        const scrollWidth = container.scrollWidth - container.clientWidth
        container.scrollLeft = scrollWidth / 2
        updateCenterPhone()
      }, 100)
      
      // 监听滚动事件
      container.addEventListener('scroll', updateCenterPhone)
      
      return () => {
        container.removeEventListener('scroll', updateCenterPhone)
      }
    }
  }, [])

  const copyWeChatId = async () => {
    const wechatId = 'EuroStay' // 可以替换为实际的微信号
    try {
      await navigator.clipboard.writeText(wechatId)
      alert(language === 'zh' ? '微信号已复制到剪贴板！' : 'WeChat ID copied to clipboard!')
    } catch (err) {
      // 降级方案：使用传统方法
      const textArea = document.createElement('textarea')
      textArea.value = wechatId
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'
      document.body.appendChild(textArea)
      textArea.select()
      try {
        document.execCommand('copy')
        alert(language === 'zh' ? '微信号已复制到剪贴板！' : 'WeChat ID copied to clipboard!')
      } catch (err) {
        alert(language === 'zh' ? '复制失败，请手动复制：' + wechatId : 'Copy failed, please copy manually: ' + wechatId)
      }
      document.body.removeChild(textArea)
    }
  }

  return (
    <div className="home">
      <section className="hero">
        <div className="hero-main">
          <div className="hero-content">
            <h1 className="hero-title">{t.heroTitle}</h1>
            <p className="hero-subtitle">{t.heroSubtitle}</p>
            <div className="hero-buttons">
              <a
                href="#"
                className="btn btn-primary"
                onClick={(e) => {
                  e.preventDefault()
                  alert(language === 'zh' ? '下载链接将在这里添加' : 'Download link will be added here')
                }}
              >
                {t.downloadIOS}
              </a>
              <a
                href="#"
                className="btn btn-secondary"
                onClick={(e) => {
                  e.preventDefault()
                  alert(language === 'zh' ? '下载链接将在这里添加' : 'Download link will be added here')
                }}
              >
                {t.downloadAndroid}
              </a>
            </div>
            <div className="hero-links">
              <Link to="/products" className="link-text">
                {t.learnMore}
              </Link>
            </div>
          </div>
          <div className="hero-image">
            <div className="hero-placeholder">
              <span>{language === 'zh' ? '产品展示图' : 'Product Showcase'}</span>
            </div>
          </div>
        </div>
      </section>

      <section className="hero-stats">
        <div className="stat-item">
          <div className="stat-number stat-purple">2024</div>
          <div className="stat-label">{language === 'zh' ? '至今' : 'To Date'}</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number stat-yellow">100万+</div>
          <div className="stat-label">{language === 'zh' ? '话题热度' : 'Topic Popularity'}</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number stat-yellow">30000+</div>
          <div className="stat-label">{language === 'zh' ? '社群人数' : 'Community Members'}</div>
        </div>
        <div className="stat-divider"></div>
        <div className="stat-item">
          <div className="stat-number stat-yellow">30+</div>
          <div className="stat-label">{language === 'zh' ? '覆盖国家' : 'Countries Covered'}</div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2 className="section-title">{t.featuresTitle}</h2>
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-image feature-phone-gallery">
                <button className="phone-nav-btn phone-nav-prev" onClick={() => scrollPhoneGallery(-1)}>
                  ‹
                </button>
                <div className="phone-gallery-scroll" ref={phoneGalleryRef}>
                  <div className="phone-gallery-inner">
                    <div className="phone-mockup">
                      <div className="phone-screen-mockup">
                        <div className="phone-screen-placeholder">
                          <span>{language === 'zh' ? '界面 1' : 'Screen 1'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="phone-mockup">
                      <div className="phone-screen-mockup">
                        <div className="phone-screen-placeholder">
                          <span>{language === 'zh' ? '界面 2' : 'Screen 2'}</span>
                        </div>
                      </div>
                    </div>
                    <div className="phone-mockup">
                      <div className="phone-screen-mockup">
                        <div className="phone-screen-placeholder">
                          <span>{language === 'zh' ? '界面 3' : 'Screen 3'}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="phone-nav-btn phone-nav-next" onClick={() => scrollPhoneGallery(1)}>
                  ›
                </button>
              </div>
              <div className="feature-card-content">
                <h3>{t.feature1Title}</h3>
                <p>{t.feature1Desc}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <div className="feature-image-placeholder">
                  <span>{language === 'zh' ? '图片 2' : 'Image 2'}</span>
                </div>
              </div>
              <div className="feature-card-content">
                <h3>{t.feature2Title}</h3>
                <p>{t.feature2Desc}</p>
              </div>
            </div>
            <div className="feature-card">
              <div className="feature-image">
                <div className="feature-image-placeholder">
                  <span>{language === 'zh' ? '图片 3' : 'Image 3'}</span>
                </div>
              </div>
              <div className="feature-card-content">
                <h3>{t.feature3Title}</h3>
                <p>{t.feature3Desc}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="vision">
        <div className="container">
          <div className="vision-header">
            <h2 className="vision-title-primary">{t.visionTitlePrimary}</h2>
            <h2 className="vision-title-secondary">{t.visionTitleSecondary}</h2>
            <p className="vision-tagline">{t.visionTagline}</p>
          </div>

          <div className="vision-description">
            <p>{t.visionDesc1}</p>
            <p>{t.visionDesc2}</p>
            <p>{t.visionDesc3}</p>
          </div>


          <div className="vision-gallery">
            <div className="gallery-container" ref={galleryContainerRef}>
              <div className="gallery-track">
                <div className="host-card">
                  <div className="host-card-banner">@EuroStay-寻找100个欧洲Host!</div>
                  <div className="host-card-placeholder">
                    <span>{language === 'zh' ? '阿姆斯特丹 凭实力单身局' : 'Amsterdam: Single by Strength'}</span>
                  </div>
                  <h3 className="host-card-title">阿姆斯特丹 凭实力单身局</h3>
                </div>
                <div className="host-card">
                  <div className="host-card-banner">@EuroStay-寻找100个欧洲Host!</div>
                  <div className="host-card-placeholder">
                    <span>{language === 'zh' ? '生活的100种可能性 01 荷兰玥哥' : '100 Possibilities of Life 01'}</span>
                  </div>
                  <h3 className="host-card-title">生活的100种可能性 01 荷兰玥哥</h3>
                </div>
                <div className="host-card">
                  <div className="host-card-banner">@EuroStay-寻找100个欧洲Host!</div>
                  <div className="host-card-placeholder">
                    <span>{language === 'zh' ? '来荷兰 欢迎住我家!' : 'Come to Netherlands'}</span>
                  </div>
                  <h3 className="host-card-title">来荷兰 欢迎住我家!</h3>
                </div>
                <div className="host-card">
                  <div className="host-card-banner">@EuroStay-寻找100个欧洲Host!</div>
                  <div className="host-card-placeholder">
                    <span>{language === 'zh' ? '来意大利 欢迎住我家!' : 'Come to Italy'}</span>
                  </div>
                  <h3 className="host-card-title">来意大利 欢迎住我家!</h3>
                </div>
                <div className="host-card">
                  <div className="host-card-banner">@EuroStay-寻找100个欧洲Host!</div>
                  <div className="host-card-placeholder">
                    <span>{language === 'zh' ? '来西班牙 欢迎住我家!' : 'Come to Spain'}</span>
                  </div>
                  <h3 className="host-card-title">来西班牙 欢迎住我家!</h3>
                </div>
              </div>
            </div>
            <button className="gallery-btn gallery-btn-prev" onClick={() => scrollGallery(-1)}>
              ‹
            </button>
            <button className="gallery-btn gallery-btn-next" onClick={() => scrollGallery(1)}>
              ›
            </button>
          </div>

          <div className="vision-cta">
            <p>{t.visionCta1}</p>
            <p>{t.visionCta2}</p>
            <button className="btn-copy-wechat" onClick={copyWeChatId}>
              {language === 'zh' ? '复制微信号' : 'Copy WeChat ID'}
            </button>
          </div>
        </div>
      </section>


    </div>
  )
}

export default Home

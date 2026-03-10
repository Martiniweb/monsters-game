'use client'

import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

export default function Home() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setIsMobile(width <= 768)
      
      // Вычисляем масштаб для десктопа
      if (width > 768) {
        const scaleX = width / 1600
        const scaleY = height / 900
        const newScale = Math.min(scaleX, scaleY, 1)
        setScale(newScale)
      }
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Пока не определили устройство, ничего не рендерим
  if (isMobile === null) {
    return null
  }

  // Мобильная версия
  if (isMobile) {
    return (
      <div style={{
        width: '100%',
        display: 'flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        background: 'rgba(225, 98, 26, 1)',
        userSelect: 'none',
        WebkitUserSelect: 'none'
      }}>
        <div style={{
          width: '100%',
          maxWidth: '375px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '20px 16px 24px 16px',
          boxSizing: 'border-box'
        }}>
          {/* Логотип megatextlogo */}
          <div style={{
            width: '325px',
            height: '118px',
            flexShrink: 0,
            backgroundImage: 'url(/megatextlogo.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            marginBottom: '5px'
          }} />

          {/* Контейнер для монстра с эллипсом */}
          <div style={{
            position: 'relative',
            width: '335px',
            height: '321px',
            flexShrink: 0,
            marginBottom: '12px'
          }}>
            {/* Эллипс с градиентом за монстром */}
            <div style={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              width: '360px',
              height: '360px',
              background: 'radial-gradient(50% 50% at 50% 50%, rgba(217, 217, 217, 1) 0%, rgba(255, 255, 255, 0) 100%)',
              pointerEvents: 'none'
            }} />

            {/* Громыхалыч */}
            <div 
              className="mobile-monster"
              style={{
              width: '335px',
              height: '321px',
              backgroundImage: 'url(/gromichalichmonstr4.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              transform: 'scaleX(-1)'
            }} />
          </div>

          {/* Текст описания */}
          <div style={{
            width: '100%',
            maxWidth: '328px',
            fontFamily: 'Involve, sans-serif',
            fontSize: '13px',
            fontWeight: '500',
            letterSpacing: '0px',
            lineHeight: '20px',
            color: 'rgba(255, 255, 255, 1)',
            textAlign: 'justify',
            marginBottom: '16px',
            flexShrink: 0
          }}>
            Тысячи невидимых жильцов прячутся в каждой квартире. Днём они спят. А ночью скрипят половицы, капает кран, гуляет сквозняк. Это не просто случайности. Это Мега Монстры. Поймай их всех в нашей игре, узнай их имена и научись защищать свой дом.
          </div>

          {/* Кнопка войти в игру */}
          <div 
            onClick={() => {
              localStorage.removeItem('correctAnswers')
              localStorage.removeItem('monsterIndex')
              localStorage.removeItem('answeredMonsters')
              localStorage.removeItem('memoryTime')
              localStorage.removeItem('monsterTimer')
              localStorage.removeItem('totalTime')
              router.push('/game')
            }}
            style={{
              width: '288px',
              height: '52px',
              borderRadius: '16px',
              background: 'linear-gradient(180.78deg, rgba(255, 255, 255, 1) 100%)',
              border: '0.5px solid rgba(210, 206, 255, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              flexShrink: 0
            }}>
            <span style={{
              fontFamily: 'Involve, sans-serif',
              fontSize: '18px',
              fontWeight: '700',
              color: '#F65128'
            }}>
              Войти в игру
            </span>
          </div>

          {/* CSS анимации для мобильной версии */}
          <style jsx global>{`
            .mobile-monster {
              animation: mobileFloat 3s ease-in-out infinite;
            }
            @keyframes mobileFloat {
              0%, 100% { transform: scaleX(-1) translateY(0px); }
              50% { transform: scaleX(-1) translateY(-15px); }
            }
          `}</style>
        </div>
      </div>
    )
  }

  // Десктопная версия

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'rgba(225, 98, 26, 1)',
      userSelect: 'none',
      WebkitUserSelect: 'none',
      overflow: 'hidden'
    }}>
      <div style={{
        width: '1600px',
        height: '900px',
        position: 'relative',
        overflow: 'hidden',
        transform: `scale(${scale})`,
        transformOrigin: 'center center',
        flexShrink: 0
      }}>
        {/* Эллипс с радиальным градиентом по центру */}
        <div style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '793px',
          height: '793px',
          background: 'radial-gradient(49.94% 49.94% at 50.06305170239597% 50.06305170239597%, rgba(217, 217, 217, 1) 0%, rgba(255, 255, 255, 0) 100%)'
        }} />

        {/* Изображение мегамонстра */}
        <div style={{
          position: 'absolute',
          left: '78px',
          top: '27px',
          width: '1442px',
          height: '457px',
          backgroundImage: 'url(/megam.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }} />

        {/* Гулбетон Громыхалыч */}
        <div 
          className="gromichalich-monster"
          style={{
          position: 'absolute',
          left: '479px',
          top: '150px',
          width: '751px',
          height: '614.24px',
          backgroundImage: 'url(/gromichalichmonstr4.png)',
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
          cursor: 'pointer'
        }} />

        {/* Текст описания */}
        <div style={{
          position: 'absolute',
          left: '87px',
          top: '464px',
          width: '392px',
          height: '109px',
          fontFamily: 'Involve, sans-serif',
          fontSize: '14px',
          fontWeight: '500',
          letterSpacing: '0px',
          lineHeight: '20px',
          color: 'rgba(255, 255, 255, 1)',
          verticalAlign: 'top',
          textAlign: 'justify'
        }}>
          Тысячи невидимых жильцов прячутся в каждой квартире. Днём они спят. А ночью скрипят половицы, капает кран, гуляет сквозняк. Это не просто случайности. Это Мега Монстры. Поймай их всех в нашей игре, узнай их имена и научись защищать свой дом.
        </div>

        {/* Кнопка войти в игру */}
        <div 
          onClick={() => {
            localStorage.removeItem('correctAnswers')
            localStorage.removeItem('monsterIndex')
            localStorage.removeItem('answeredMonsters')
            localStorage.removeItem('memoryTime')
            localStorage.removeItem('monsterTimer')
            localStorage.removeItem('totalTime')
            router.push('/game')
          }}
          className="enter-button"
          style={{
          position: 'absolute',
          left: '87px',
          top: '600px',
          width: '246px',
          height: '52px',
          borderRadius: '16px',
          background: 'linear-gradient(180.78deg, rgba(255, 255, 255, 1) 100%)',
          border: '0.5px solid rgba(210, 206, 255, 1)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          cursor: 'pointer',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease'
        }}>
          <span style={{
            fontFamily: 'Involve, sans-serif',
            fontSize: '20px',
            fontWeight: '700',
            color: '#F65128'
          }}>
            Войти в игру
          </span>
        </div>

        <style jsx global>{`
          .enter-button:hover {
            transform: translateY(-3px) scale(1.05);
          }
          .monster-icon:hover {
            transform: scale(1.15) translateY(-5px);
          }
          .gromichalich-monster {
            animation: float 3s ease-in-out infinite;
          }
          .gromichalich-monster:hover {
            transform: scaleX(-1) scale(1.05);
          }
          @keyframes float {
            0%, 100% { transform: scaleX(-1) translateY(0px); }
            50% { transform: scaleX(-1) translateY(-15px); }
          }
        `}</style>

        {/* Фрейм с монстрами */}
        <div style={{
          position: 'absolute',
          left: '361px',
          top: '796px',
          width: '988px',
          height: '77px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start'
        }}>
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/skripun.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/plesenmonstr2.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/monstr3kapalich.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/tresihnmonstr5.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/energomormonst6.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/zazormonstr8.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
          <div className="monster-icon" style={{ width: '77px', height: '77px', backgroundImage: 'url(/rijikmonstr7.8.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', backgroundPosition: 'center', transition: 'transform 0.3s ease', cursor: 'pointer' }} />
        </div>

      </div>
    </div>
  )
}

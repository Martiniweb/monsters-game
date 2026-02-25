'use client'

import { useState, useEffect, useCallback } from 'react'

// Данные промокодов с изображениями
const promocodes = [
  { id: 1, image: '/shurikbig.png', name: 'Шуруповерт', percent: '10%', description: 'Скидка 10% процентов на все шуруповерты' },
  { id: 2, image: '/rultkabig.png', name: 'Рулетка', percent: '15%', description: 'Скидка 15% процентов на рулетки' },
  { id: 3, image: '/ploskibig.png', name: 'Пассатижи', percent: '10%', description: 'Скидка 10% процентов на пассатижи' },
  { id: 4, image: '/molotokbig.png', name: 'Молоток', percent: '10%', description: 'Скидка 10% процентов на молотки' },
  { id: 5, image: '/pilabig.png', name: 'Ножовка', percent: '15%', description: 'Скидка 15% процентов на ножовки' },
]

// Ранги
const ranks = [
  {
    name: 'Бетонный бригадир',
    image: '/brigadir.png',
    memoryTimeMax: 120, // до 2:00
    correctMin: 10,
    totalTimeMax: 360 // до 6:00
  },
  {
    name: 'Мастер-отделочник',
    image: '/master.png',
    memoryTimeMin: 121, // 2:01
    memoryTimeMax: 150, // 2:30
    correctMin: 8,
    correctMax: 9,
    totalTimeMin: 361, // 6:01
    totalTimeMax: 480 // 8:00
  },
  {
    name: 'Прораб средней полосы',
    image: '/prorab.png',
    memoryTimeMin: 151, // 2:31
    memoryTimeMax: 210, // 3:30
    correctMin: 6,
    correctMax: 7,
    totalTimeMin: 481, // 8:01
    totalTimeMax: 600 // 10:00
  },
  {
    name: 'Паркетный философ',
    image: '/filosof.png',
    memoryTimeMin: 211, // 3:31+
    correctMax: 5,
    totalTimeMin: 601 // 10:01+
  }
]

// Функция определения ранга
function calculateRank(memoryTime: number, totalTime: number, correctAnswers: number) {
  // Бетонный бригадир - лучшее звание
  if (memoryTime <= 120 && correctAnswers === 10 && totalTime <= 360) {
    return ranks[0]
  }
  // Мастер-отделочник
  if (memoryTime >= 121 && memoryTime <= 150 && correctAnswers >= 8 && correctAnswers <= 9 && totalTime >= 361 && totalTime <= 480) {
    return ranks[1]
  }
  // Прораб средней полосы
  if (memoryTime >= 151 && memoryTime <= 210 && correctAnswers >= 6 && correctAnswers <= 7 && totalTime >= 481 && totalTime <= 600) {
    return ranks[2]
  }
  // Паркетный философ - по умолчанию
  return ranks[3]
}

// Карточка промокода
function PromoCard({ image, blur = 3, opacity = 0.7 }: { image: string; blur?: number; opacity?: number }) {
  return (
    <div style={{
      width: '119px',
      height: '119px',
      borderRadius: '20px',
      background: 'rgba(255, 255, 255, 1)',
      boxShadow: '6px 6px 54px rgba(0, 0, 0, 0.05)',
      overflow: 'hidden',
      position: 'relative',
      flexShrink: 0
    }}>
      <img
        src={image}
        alt=""
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          width: '120px',
          height: 'auto',
          filter: `blur(${blur}px)`,
          opacity: opacity
        }}
      />
      <div style={{
        position: 'absolute',
        left: 0,
        top: 0,
        width: '100%',
        height: '100%',
        background: 'rgba(255, 255, 255, 0.4)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)',
        borderRadius: '20px'
      }} />
    </div>
  )
}

// Форматирование времени
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function ResultPage() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [displayCards, setDisplayCards] = useState(promocodes.map(p => p.image))
  
  // Состояние для результатов
  const [memoryTime, setMemoryTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedMemoryTime = localStorage.getItem('memoryTime')
    const savedTotalTime = localStorage.getItem('monsterTimer')
    const savedCorrectAnswers = localStorage.getItem('correctAnswers')
    
    if (savedMemoryTime) setMemoryTime(parseInt(savedMemoryTime))
    if (savedTotalTime) setTotalTime(parseInt(savedTotalTime))
    if (savedCorrectAnswers) setCorrectAnswers(parseInt(savedCorrectAnswers))
    
    setIsHydrated(true)
  }, [])

  // Получаем текущий ранг
  const currentRank = calculateRank(memoryTime, totalTime, correctAnswers)
  
  // Функция запуска прокрутки
  const startSpin = useCallback((direction: 'left' | 'right') => {
    if (isSpinning) return
    
    setIsSpinning(true)
    setSelectedIndex(null)
    setShowPopup(false)
    
    let spinCount = 0
    const maxSpins = 15 + Math.floor(Math.random() * 5)
    let currentDelay = 60
    
    const spin = () => {
      setDisplayCards(prev => {
        const newCards = [...prev]
        if (direction === 'right') {
          const first = newCards.shift()!
          newCards.push(first)
        } else {
          const last = newCards.pop()!
          newCards.unshift(last)
        }
        return newCards
      })
      
      spinCount++
      
      const progress = spinCount / maxSpins
      currentDelay = 60 + Math.pow(progress, 2) * 300
      
      if (spinCount < maxSpins) {
        setTimeout(spin, currentDelay)
      } else {
        setIsSpinning(false)
        setSelectedIndex(2)
        setTimeout(() => setShowPopup(true), 350)
      }
    }
    
    spin()
  }, [isSpinning])

  return (
    <div style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(90deg, rgba(255, 148, 73, 1) 0%, rgba(246, 81, 40, 1) 100%)',
      userSelect: 'none',
      WebkitUserSelect: 'none'
    }}>
      <div style={{
        width: '1600px',
        height: '900px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Заголовок ПОЗДРАВЛЯЕМ! */}
        <div style={{
          position: 'absolute',
          left: '137px',
          top: '90px',
          width: '411px',
          height: '73px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <span style={{
            fontSize: '55px',
            fontWeight: '700',
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: 'Involve, sans-serif',
            letterSpacing: '-0.04em',
            textTransform: 'uppercase'
          }}>
            ПОЗДРАВЛЯЕМ!
          </span>
        </div>

        {/* Описание */}
        <div style={{
          position: 'absolute',
          left: '137px',
          top: '198px',
          width: '709px',
          height: '131px',
          fontSize: '25px',
          fontWeight: '400',
          letterSpacing: '0px',
          lineHeight: '36.2px',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'justify',
          verticalAlign: 'top',
          fontFamily: 'Involve, sans-serif'
        }}>
          Ты прошёл игру, изучил всех монстров и закрыл их досье. Теперь твой дом под защитой, а вредители знают, кто тут главный. Держи свой результат и гордись — ты это заслужил.
        </div>

        {/* Промокод текст */}
        <div style={{
          position: 'absolute',
          left: '137px',
          top: '380px',
          width: '609px',
          height: '102px',
          fontSize: '25px',
          fontWeight: '400',
          letterSpacing: '0px',
          lineHeight: '36.2px',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'justify',
          verticalAlign: 'top',
          fontFamily: 'Involve, sans-serif'
        }}>
          А в награду — выбери свой <span style={{ fontWeight: '500', color: '#FFFF66' }}>ПРОМОКОД</span>: листай и забирай тот, который сделает ремонт ещё приятнее
        </div>

        {/* Кнопка Получить промокод */}
        <div
          onClick={() => startSpin('right')}
          style={{
            position: 'absolute',
            left: '278px',
            top: '695px',
            width: '220px',
            height: '50px',
            borderRadius: '60px',
            background: 'rgba(255, 255, 255, 1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            opacity: isSpinning ? 0.5 : 1,
            transition: 'transform 0.2s ease',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            if (!isSpinning) e.currentTarget.style.transform = 'scale(1.05)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
          }}
        >
          <span style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'rgba(250, 110, 54, 1)',
            fontFamily: 'Involve, sans-serif',
            whiteSpace: 'nowrap'
          }}>
            Получить промокод
          </span>
        </div>

        {/* Кнопка Выход */}
        <div
          onClick={() => window.location.href = '/'}
          style={{
            position: 'absolute',
            left: '518px',
            top: '695px',
            width: '120px',
            height: '50px',
            borderRadius: '60px',
            background: 'transparent',
            border: '2px solid rgba(255, 255, 255, 1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, background 0.2s ease',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.background = 'transparent'
          }}
        >
          <span style={{
            fontSize: '18px',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 1)',
            fontFamily: 'Involve, sans-serif',
            whiteSpace: 'nowrap'
          }}>
            Выход
          </span>
        </div>

        {/* Стрелка влево */}
        <img
          src="/left.png"
          alt="Влево"
          onClick={() => startSpin('left')}
          style={{
            position: 'absolute',
            left: '90px',
            top: '571px',
            width: '30px',
            height: 'auto',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            opacity: isSpinning ? 0.5 : 1,
            transition: 'transform 0.2s ease',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            transform: 'translateY(-50%)'
          }}
          onMouseEnter={(e) => {
            if (!isSpinning) e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        />

        {/* Контейнер с карточками */}
        <div style={{
          position: 'absolute',
          left: '137px',
          top: '512px',
          display: 'flex',
          gap: '12px'
        }}>
          {displayCards.map((image, index) => (
            <PromoCard key={index} image={image} />
          ))}
        </div>

        {/* Стрелка вправо */}
        <img
          src="/right.png"
          alt="Вправо"
          onClick={() => startSpin('right')}
          style={{
            position: 'absolute',
            left: '790px',
            top: '571px',
            width: '30px',
            height: 'auto',
            cursor: isSpinning ? 'not-allowed' : 'pointer',
            opacity: isSpinning ? 0.5 : 1,
            transition: 'transform 0.2s ease',
            filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))',
            transform: 'translateY(-50%)'
          }}
          onMouseEnter={(e) => {
            if (!isSpinning) e.currentTarget.style.transform = 'translateY(-50%) scale(1.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(-50%) scale(1)'
          }}
        />

        {/* Изображение ранга */}
        {currentRank.image === '/filosof.png' ? (
          <div
            style={{
              position: 'absolute',
              left: '996px',
              top: '50px',
              width: '400px',
              height: '480px',
              overflow: 'hidden'
            }}
          >
            <img
              src={currentRank.image}
              alt={currentRank.name}
              style={{
                width: '400px',
                height: 'auto',
                opacity: 1
              }}
            />
          </div>
        ) : currentRank.image === '/master.png' ? (
          <div
            style={{
              position: 'absolute',
              left: '996px',
              top: '220px',
              width: '400px',
              height: '1000px',
              overflow: 'hidden'
            }}
          >
            <img
              src={currentRank.image}
              alt={currentRank.name}
              style={{
                width: '400px',
                height: 'auto',
                opacity: 1
              }}
            />
          </div>
        ) : (
          <img
            src={currentRank.image}
            alt={currentRank.name}
            style={{
              position: 'absolute',
              left: '996px',
              top: '130px',
              width: '400px',
              height: 'auto',
              opacity: 1
            }}
          />
        )}

        {/* Белая плашка под рангом */}
        <div style={{
          position: 'absolute',
          left: '964px',
          top: '512px',
          width: '464px',
          height: '119px',
          opacity: 1,
          borderRadius: '25px',
          background: 'rgba(255, 255, 255, 1)',
          boxShadow: '0px 20px 60px rgba(128, 144, 155, 0.2)'
        }}>
          <div style={{
            position: 'absolute',
            left: '37px',
            top: '31px',
            width: '130px',
            height: '23px',
            fontSize: '20px',
            fontWeight: '500',
            letterSpacing: '0px',
            lineHeight: '28.96px',
            color: 'rgba(64, 64, 64, 1)',
            fontFamily: 'Involve, sans-serif'
          }}>
            твоё звание
          </div>
          <div style={{
            position: 'absolute',
            left: '37px',
            top: '54px',
            width: '390px',
            height: '40px',
            fontSize: '30px',
            fontWeight: '700',
            letterSpacing: '0px',
            lineHeight: '43.44px',
            color: 'rgba(64, 64, 64, 1)',
            fontFamily: 'Involve, sans-serif'
          }}>
            {currentRank.name}
          </div>
        </div>

        {/* Надпись "Время в игре" */}
        <div style={{
          position: 'absolute',
          left: '964px',
          top: '650px',
          width: '138px',
          height: '23px',
          fontSize: '20px',
          fontWeight: '500',
          letterSpacing: '0px',
          lineHeight: '28.96px',
          color: 'rgba(255, 255, 102, 1)',
          fontFamily: 'Involve, sans-serif'
        }}>
          Время в игре
        </div>

        {/* Время таймера */}
        <div style={{
          position: 'absolute',
          left: '964px',
          top: '670px',
          width: '162px',
          height: '85px',
          fontSize: '64px',
          fontWeight: '700',
          letterSpacing: '0px',
          lineHeight: '75px',
          color: 'rgba(255, 255, 102, 1)',
          fontFamily: 'Involve, sans-serif'
        }}>
          {formatTime(totalTime)}
        </div>

        {/* Надпись "Правильные ответы" */}
        <div style={{
          position: 'absolute',
          left: '1200px',
          top: '650px',
          width: '200px',
          height: '23px',
          fontSize: '20px',
          fontWeight: '500',
          letterSpacing: '0px',
          lineHeight: '28.96px',
          color: 'rgba(255, 255, 102, 1)',
          fontFamily: 'Involve, sans-serif'
        }}>
          Правильные ответы
        </div>

        {/* Счётчик ответов */}
        <div style={{
          position: 'absolute',
          left: '1200px',
          top: '670px',
          width: '200px',
          height: '85px',
          fontSize: '64px',
          fontWeight: '700',
          letterSpacing: '0px',
          lineHeight: '75px',
          color: 'rgba(255, 255, 102, 1)',
          fontFamily: 'Involve, sans-serif'
        }}>
          {correctAnswers}/10
        </div>

        {/* Всплывающее окно */}
        {showPopup && selectedIndex !== null && (
          <div style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: '672px',
            height: '672px',
            borderRadius: '55px',
            background: 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 30px 100px rgba(0, 0, 0, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '30px',
            zIndex: 100,
            animation: 'popupIn 0.4s ease-out'
          }}>
            {/* Изображение */}
            <img
              src={displayCards[2]}
              alt=""
              style={{
                width: '429px',
                height: '443px',
                objectFit: 'contain',
                marginTop: '-20px'
              }}
            />
            
            {/* Кнопка */}
            <button
              onClick={() => setShowPopup(false)}
              style={{
                marginTop: '50px',
                width: '453px',
                height: '92px',
                fontSize: '32px',
                fontWeight: '700',
                color: 'white',
                background: 'rgba(33, 33, 33, 1)',
                border: 'none',
                borderRadius: '20px',
                cursor: 'pointer',
                transition: 'transform 0.2s ease, background 0.2s ease',
                fontFamily: 'Involve, sans-serif',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.02)'
                e.currentTarget.style.background = 'rgba(50, 50, 50, 1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.background = 'rgba(33, 33, 33, 1)'
              }}
            >
              <span style={{ fontWeight: '700', fontSize: '32px' }}>{promocodes.find(p => p.image === displayCards[2])?.name || 'Приз'}</span>
              <span style={{ fontWeight: '700', fontSize: '45px' }}>|</span>
              <span style={{ fontWeight: '700', fontSize: '45px' }}>{promocodes.find(p => p.image === displayCards[2])?.percent || '10%'}</span>
            </button>
            
            {/* Текст под кнопкой */}
            <div style={{
              marginTop: '15px',
              fontSize: '15px',
              fontWeight: '500',
              color: 'rgba(163, 174, 208, 1)',
              fontFamily: 'Involve, sans-serif',
              textAlign: 'center'
            }}>
              {promocodes.find(p => p.image === displayCards[2])?.description || 'Скидка на товар'}
            </div>
          </div>
        )}

        {/* Затемнение фона при popup */}
        {showPopup && (
          <div
            onClick={() => setShowPopup(false)}
            style={{
              position: 'absolute',
              left: 0,
              top: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.3)',
              zIndex: 99
            }}
          />
        )}
      </div>

      {/* CSS анимация для popup */}
      <style jsx global>{`
        @keyframes popupIn {
          from {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8);
          }
          to {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

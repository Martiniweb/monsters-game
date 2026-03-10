'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'

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
    name: 'Прораб средн. полосы',
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

// Форматирование времени
function formatTime(seconds: number): string {
  const mins = Math.floor(seconds / 60)
  const secs = seconds % 60
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
}

export default function ResultPage() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState<boolean | null>(null)
  const [scale, setScale] = useState(1)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [showPopup, setShowPopup] = useState(false)
  const [displayCards, setDisplayCards] = useState(promocodes.map(p => p.image))
  
  // Состояние для результатов
  const [memoryTime, setMemoryTime] = useState(0)
  const [totalTime, setTotalTime] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [isHydrated, setIsHydrated] = useState(false)

  // Определение мобильного устройства и масштаба
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth
      const height = window.innerHeight
      setIsMobile(width <= 768)
      
      // Вычисляем масштаб для десктопа
      if (width > 768) {
        const scaleX = width / 1600
        const scaleY = height / 900
        const newScale = Math.min(scaleX, scaleY, 1) // не увеличиваем, только уменьшаем
        setScale(newScale)
      }
    }
    checkDevice()
    window.addEventListener('resize', checkDevice)
    return () => window.removeEventListener('resize', checkDevice)
  }, [])

  // Загрузка данных из localStorage
  useEffect(() => {
    const savedMemoryTime = localStorage.getItem('memoryTime')
    const savedTotalTime = localStorage.getItem('totalTime')
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

  // Показываем загрузку пока не определили устройство
  if (isMobile === null) {
    return (
      <div style={{
        minHeight: '100vh',
        width: '100%',
        background: 'linear-gradient(90deg, rgba(255, 148, 73, 1) 0%, rgba(246, 81, 40, 1) 100%)'
      }} />
    )
  }

  // Мобильная версия
  if (isMobile) {
    return (
      <div style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        background: 'linear-gradient(90deg, rgba(255, 148, 73, 1) 0%, rgba(246, 81, 40, 1) 100%)',
        userSelect: 'none',
        WebkitUserSelect: 'none',
        paddingTop: '20px'
      }}>
        {/* Изображение ранга */}
        <div style={{
          width: '320px',
          height: '300px',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          flexShrink: 0,
          paddingTop: '20px',
          marginBottom: '-20px'
        }}>
          <img
            src={currentRank.image}
            alt={currentRank.name}
            style={{
              width: currentRank.image === '/brigadir.png' ? '280px' :
                     currentRank.image === '/master.png' ? '300px' :
                     currentRank.image === '/prorab.png' ? '260px' : '200px',
              height: 'auto',
              objectFit: 'contain',
              display: 'block'
            }}
          />
        </div>

        {/* Белая плашка под рангом */}
        <div style={{
          width: '300px',
          height: '80px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 1)',
          boxShadow: '0px 20px 60px rgba(128, 144, 155, 0.2)',
          padding: '12px 20px',
          marginTop: '10px',
          flexShrink: 0
        }}>
          <div style={{
            fontSize: '14px',
            fontWeight: '500',
            color: 'rgba(64, 64, 64, 1)',
            fontFamily: 'Involve, sans-serif'
          }}>
            твоё звание
          </div>
          <div style={{
            fontSize: '20px',
            fontWeight: '700',
            color: 'rgba(64, 64, 64, 1)',
            fontFamily: 'Involve, sans-serif',
            marginTop: '4px'
          }}>
            {currentRank.name}
          </div>
        </div>

        {/* Время в игре и Правильные ответы - горизонтально */}
        <div style={{
          width: '300px',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px',
          flexShrink: 0
        }}>
          {/* Время в игре */}
          <div style={{ textAlign: 'left' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 102, 1)',
              fontFamily: 'Involve, sans-serif'
            }}>
              Время в игре
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'rgba(255, 255, 102, 1)',
              fontFamily: 'Involve, sans-serif'
            }}>
              {formatTime(totalTime)}
            </div>
          </div>

          {/* Правильные ответы */}
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontSize: '14px',
              fontWeight: '500',
              color: 'rgba(255, 255, 102, 1)',
              fontFamily: 'Involve, sans-serif'
            }}>
              Правильные ответы
            </div>
            <div style={{
              fontSize: '32px',
              fontWeight: '700',
              color: 'rgba(255, 255, 102, 1)',
              fontFamily: 'Involve, sans-serif'
            }}>
              {correctAnswers}/10
            </div>
          </div>
        </div>

        {/* Текст ПОЗДРАВЛЯЕМ! */}
        <div style={{
          width: '300px',
          textAlign: 'left',
          fontSize: '36px',
          fontWeight: '700',
          letterSpacing: '-1px',
          color: 'rgba(255, 255, 255, 1)',
          fontFamily: 'Involve, sans-serif',
          textTransform: 'uppercase',
          marginTop: '20px',
          flexShrink: 0
        }}>
          ПОЗДРАВЛЯЕМ!
        </div>

        {/* Подзаголовок */}
        <div style={{
          width: '300px',
          textAlign: 'left',
          fontSize: '13px',
          fontWeight: '500',
          lineHeight: '18px',
          color: 'rgba(255, 255, 255, 1)',
          fontFamily: 'Involve, sans-serif',
          marginTop: '10px',
          flexShrink: 0
        }}>
          Ты прошёл игру, изучил всех монстров и закрыл их досье. Теперь твой дом под защитой, а вредители знают, кто тут главный. Держи свой результат и гордись — ты это заслужил.
        </div>

        {/* Кнопка Играть снова */}
        <div
          onClick={() => router.push('/')}
          style={{
            width: '230px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(255, 255, 255, 1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            fontFamily: 'Involve, sans-serif',
            fontSize: '18px',
            fontWeight: '700',
            color: 'rgba(246, 81, 40, 1)',
            marginTop: '30px',
            marginBottom: '30px',
            flexShrink: 0,
            transition: 'transform 0.2s ease'
          }}
        >
          Играть снова
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
      background: 'linear-gradient(90deg, rgba(255, 148, 73, 1) 0%, rgba(246, 81, 40, 1) 100%)',
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
        {/* Заголовок ПОЗДРАВЛЯЕМ! */}
        <div style={{
          position: 'absolute',
          left: '137px',
          top: '280px',
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
          top: '388px',
          width: '709px',
          height: '131px',
          fontSize: '25px',
          fontWeight: '400',
          letterSpacing: '0px',
          lineHeight: '36.2px',
          color: 'rgba(255, 255, 255, 1)',
          textAlign: 'justify',
          fontFamily: 'Involve, sans-serif'
        }}>
          Ты прошёл игру, изучил всех монстров и закрыл их досье. Теперь твой дом под защитой, а вредители знают, кто тут главный. Держи свой результат и гордись — ты это заслужил.
        </div>

        {/* Кнопка Играть снова */}
        <div
          onClick={() => {
            localStorage.removeItem('memoryTime')
            localStorage.removeItem('monsterTimer')
            localStorage.removeItem('correctAnswers')
            window.location.href = '/game'
          }}
          style={{
            position: 'absolute',
            left: '347px',
            top: '580px',
            width: '290px',
            height: '60px',
            borderRadius: '60px',
            background: 'rgba(255, 255, 255, 1)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            cursor: 'pointer',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)'
            e.currentTarget.style.boxShadow = '0px 6px 20px rgba(0, 0, 0, 0.15)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)'
            e.currentTarget.style.boxShadow = '0px 4px 15px rgba(0, 0, 0, 0.1)'
          }}
        >
          <span style={{
            fontSize: '22px',
            fontWeight: '600',
            color: 'rgba(246, 81, 40, 1)',
            fontFamily: 'Involve, sans-serif'
          }}>
            Играть снова
          </span>
        </div>

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
      </div>
    </div>
  )
}

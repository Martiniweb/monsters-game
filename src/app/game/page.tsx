'use client'

import { useState, useEffect, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'

function GameContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const skipToVictory = searchParams.get('victory') === 'true'
  
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(!skipToVictory)
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number[]>(skipToVictory ? [1,2,3,4,5,6,7,8,9,10] : [])
  const [disappearingCards, setDisappearingCards] = useState<number[]>([])
  const [cardMonsters, setCardMonsters] = useState<number[]>([])
  const [isChecking, setIsChecking] = useState(false)
  const [showObez, setShowObez] = useState<number | null>(null)
  const [obezAnimation, setObezAnimation] = useState<'entering' | 'visible' | 'leaving' | null>(null)
  const [showVictory, setShowVictory] = useState(skipToVictory)
  const [defeatedMonster, setDefeatedMonster] = useState<number | null>(null)
  const [typedText, setTypedText] = useState('')
  const [typedMonsterName, setTypedMonsterName] = useState('')
  const [isTypingComplete, setIsTypingComplete] = useState(false)

  // Имена монстров для сообщения
  const monsterNames: { [key: number]: string } = {
    1: 'Скрипуна',
    2: 'Плесеня',
    3: 'Водяного',
    4: 'Гулбетона',
    5: 'Трещина',
    6: 'Энергоморока',
    7: 'Зазора',
    8: 'Рыжика',
    9: 'Криворучко',
    10: 'Пересорта'
  }

  useEffect(() => {
    const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const shuffled = [...cards].sort(() => Math.random() - 0.5)
    setCardMonsters(shuffled)
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null
    if (isRunning) {
      interval = setInterval(() => {
        setSeconds((prev) => prev + 1)
      }, 1000)
    }
    return () => {
      if (interval) clearInterval(interval)
    }
  }, [isRunning])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const toggleCard = (index: number) => {
    if (isChecking) return
    if (flippedCards.includes(index)) return
    if (matchedPairs.includes(cardMonsters[index])) return
    if (disappearingCards.includes(index)) return

    const newFlipped = [...flippedCards, index]
    setFlippedCards(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      const [first, second] = newFlipped
      const firstMonster = cardMonsters[first]
      const secondMonster = cardMonsters[second]

      if (firstMonster === secondMonster) {
        setDisappearingCards([first, second])
        setTimeout(() => {
          setMatchedPairs(prev => [...prev, firstMonster])
          setFlippedCards([])
          setDisappearingCards([])
          setIsChecking(false)
          // Показать сообщение об обезвреживании
          setDefeatedMonster(firstMonster)
        }, 1800)
        setTimeout(() => {
          setShowObez(firstMonster)
          setObezAnimation('entering')
        }, 2000)
        setTimeout(() => setObezAnimation('visible'), 3500)
        setTimeout(() => setObezAnimation('leaving'), 7500)
        setTimeout(() => {
          setShowObez(null)
          setObezAnimation(null)
        }, 9000)
      } else {
        setTimeout(() => {
          setFlippedCards([])
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  useEffect(() => {
    if (matchedPairs.length === 10) {
      setIsRunning(false)
      setTimeout(() => {
        setShowVictory(true)
      }, 2000)
    }
  }, [matchedPairs])

  useEffect(() => {
    const preventContextMenu = (e: MouseEvent) => e.preventDefault()
    document.addEventListener('contextmenu', preventContextMenu)
    return () => document.removeEventListener('contextmenu', preventContextMenu)
  }, [])

  // Эффект печатания текста
  useEffect(() => {
    if (defeatedMonster) {
      const fullText = 'Вы обезвредили'
      const monsterName = monsterNames[defeatedMonster]
      let index = 0
      setTypedText('')
      setTypedMonsterName('')
      setIsTypingComplete(false)
      
      // Печатаем "Вы обезвредили"
      const typeInterval = setInterval(() => {
        if (index < fullText.length) {
          setTypedText(fullText.slice(0, index + 1))
          index++
        } else {
          clearInterval(typeInterval)
          // Начинаем печатать название монстра
          let nameIndex = 0
          const nameInterval = setInterval(() => {
            if (nameIndex < monsterName.length) {
              setTypedMonsterName(monsterName.slice(0, nameIndex + 1))
              nameIndex++
            } else {
              clearInterval(nameInterval)
              setIsTypingComplete(true)
            }
          }, 100)
        }
      }, 100)
      
      return () => {
        clearInterval(typeInterval)
      }
    }
  }, [defeatedMonster])

  return (
    <div style={{ minHeight: '100vh', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(225, 98, 26, 1)', userSelect: 'none', WebkitUserSelect: 'none' }}>
      <div style={{ width: '1600px', height: '900px', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', left: '130px', top: '0px', width: '352px', height: '132px', backgroundImage: 'url(/logo.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />

        <div style={{ position: 'absolute', left: '130px', top: '150px', color: 'white' }}>
          <h1 style={{ fontSize: '28pt', fontWeight: '700', lineHeight: '1.2', margin: 0, textTransform: 'uppercase', fontFamily: 'Involve, sans-serif' }}>
            Найдите парные<br />карточки на скорость
          </h1>
          <p style={{ fontSize: '16pt', fontWeight: '400', lineHeight: '1.4', marginTop: '15px', maxWidth: '600px', fontFamily: 'Involve, sans-serif' }}>
            Приручите домашних монстров! Соберите все пары,<br />
            ответьте на вопросы и узнайте, как победить
          </p>
        </div>

        {showObez && false && (
          <div className={`obez-card obez-${obezAnimation}`} style={{ position: 'absolute', left: '540px', bottom: '100px', width: '240px', height: '335px', zIndex: 5, backgroundImage: `url(/obez${showObez}.png)`, backgroundSize: 'contain', backgroundRepeat: 'no-repeat' }} />
        )}

        <div className="sbornik-hover" style={{ position: 'absolute', left: '80px', bottom: '-120px', width: '500px', height: '675px', zIndex: 10, backgroundImage: 'url(/sbornik.png)', backgroundSize: 'contain', backgroundRepeat: 'no-repeat', transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1), filter 0.8s cubic-bezier(0.4, 0, 0.2, 1)' }} />

        {/* Таймер круглый */}
        <div style={{
          position: 'absolute',
          left: '600px',
          top: '400px',
          width: '212px',
          height: '212px',
          zIndex: 20,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <svg width="212" height="212" viewBox="0 0 212 212" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
            {/* Белый пунктирный круг (фон) */}
            <circle 
              cx="106" 
              cy="106" 
              r="98.5"
              fill="none"
              stroke="white"
              strokeWidth="15"
              strokeDasharray="5 15"
            />
            {/* Желтый прогресс - заполняется по часовой со временем (10 минут = 600 сек) */}
            <circle 
              cx="106" 
              cy="106" 
              r="98.5"
              fill="none"
              stroke="#FFFF66"
              strokeWidth="15"
              strokeDasharray={`${(seconds / 600) * 618.9} 618.9`}
              style={{ transition: 'stroke-dasharray 1s linear' }}
            />
          </svg>
          {/* Текст таймера */}
          <div style={{
            position: 'relative',
            zIndex: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2px'
          }}>
            <span style={{ fontSize: '20px', fontWeight: '400', color: 'white', fontFamily: 'Involve, sans-serif', marginBottom: '-5px' }}>Таймер</span>
            <span style={{ fontSize: '38px', fontWeight: '700', color: 'white', fontFamily: 'Involve, sans-serif' }}>{formatTime(seconds)}</span>
          </div>
        </div>

        {/* Счетчик найденных монстров */}
        <div style={{
          position: 'absolute',
          left: '600px',
          top: '620px',
          width: '212px',
          zIndex: 25,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <span style={{ 
            fontSize: '90px', 
            fontWeight: '700', 
            color: 'white', 
            fontFamily: 'Involve, sans-serif',
            letterSpacing: '-0.06em',
            transition: 'opacity 0.3s ease'
          }}>
            {matchedPairs.length}/10
          </span>
          
          {/* Сообщение об обезвреживании */}
          {defeatedMonster && matchedPairs.length > 0 && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              marginTop: '10px',
              transition: 'opacity 0.5s ease'
            }}>
              <span style={{
                fontSize: '16px',
                fontWeight: '500',
                color: 'white',
                fontFamily: 'Involve, sans-serif',
                lineHeight: 1,
                letterSpacing: '0.02em'
              }}>
                {typedText}{typedText.length < 14 && <span style={{ opacity: 0.8 }}>|</span>}
              </span>
              <span style={{
                fontSize: '32px',
                fontWeight: '700',
                color: 'white',
                fontFamily: 'Involve, sans-serif',
                lineHeight: 1.1,
                letterSpacing: '0.02em',
                minHeight: '35px'
              }}>
                {typedMonsterName}{typedMonsterName.length > 0 && typedMonsterName.length < monsterNames[defeatedMonster].length && <span style={{ opacity: 0.7 }}>|</span>}
              </span>
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', left: '200px', bottom: '140px', width: '250px', height: '280px', zIndex: 15 }}>
          {matchedPairs.map((monsterNum, index) => {
            const rotations = [-20, 12, -8, 18, -14, 10, -16, 14, -6, 20]
            const rotation = rotations[index % 10]
            const offsetX = (index % 3 === 0) ? -15 : (index % 3 === 1) ? 8 : -5
            const offsetY = index * -5
            return (
              <div key={`matched-${monsterNum}-${index}`} className="matched-card-hover" style={{ position: 'absolute', width: '220px', height: '300px', left: `${10 + offsetX}px`, top: `${20 + offsetY}px`, transform: `rotate(${rotation}deg)`, zIndex: index + 1, borderRadius: '12px', backgroundImage: `url(/monster_${monsterNum.toString().padStart(2, '0')}.png)`, backgroundSize: 'cover', transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.6s cubic-bezier(0.4, 0, 0.2, 1)' }} />
            )
          })}
        </div>

        <div style={{ position: 'absolute', right: '20px', top: '80px', display: 'grid', gridTemplateColumns: 'repeat(5, 137px)', gridTemplateRows: 'repeat(4, 191px)', gap: '10px' }}>
          {cardMonsters.length > 0 && [...Array(20)].map((_, index) => {
            const isFlipped = flippedCards.includes(index)
            const isMatched = matchedPairs.includes(cardMonsters[index])
            const isDisappearing = disappearingCards.includes(index)
            const monsterNum = cardMonsters[index]
            if (isMatched && !isDisappearing) return null
            return (
              <div key={index} onClick={() => toggleCard(index)} className={`memory-card ${isDisappearing ? 'disappearing' : ''}`} style={{ width: '137px', height: '191px', borderRadius: '12px', cursor: isDisappearing ? 'default' : 'pointer', perspective: '1000px' }}>
                <div style={{ width: '100%', height: '100%', position: 'relative', transition: 'transform 0.6s', transformStyle: 'preserve-3d', transform: isFlipped || isDisappearing ? 'rotateY(180deg)' : 'rotateY(0deg)' }}>
                  <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', borderRadius: '12px', backgroundImage: 'url(/card_back.png)', backgroundSize: 'cover' }} />
                  <div style={{ position: 'absolute', width: '100%', height: '100%', backfaceVisibility: 'hidden', transform: 'rotateY(180deg)', borderRadius: '12px', backgroundImage: `url(/monster_${monsterNum.toString().padStart(2, '0')}.png)`, backgroundSize: 'cover' }} />
                </div>
              </div>
            )
          })}
        </div>

        {showVictory && (
          <div className="victory-screen">
            <div className="papki-hover" style={{
              position: 'absolute',
              left: '50%',
              top: '36%',
              transform: 'translate(-50%, -50%)',
              width: '1560px',
              height: '610px',
              backgroundImage: 'url(/papki.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              transition: 'transform 0.5s ease, filter 0.5s ease'
            }} />
            <div style={{
              position: 'absolute',
              left: '390px',
              top: '616px',
              textAlign: 'left'
            }}>
              <div style={{
                fontSize: '22px',
                fontWeight: '500',
                lineHeight: '31.86px',
                letterSpacing: '0px',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Involve, sans-serif'
              }}>
                Отличная работа!
              </div>
              <div style={{
                fontSize: '96px',
                fontWeight: '500',
                letterSpacing: '-0.03em',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Involve, sans-serif',
                marginTop: '5px'
              }}>
                Все монстры пойманы
              </div>
              <div style={{
                fontSize: '28px',
                fontWeight: '500',
                letterSpacing: '-0.03em',
                lineHeight: '1.295',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Involve, sans-serif',
                marginTop: '10px'
              }}>
                Вы собрали все парные карточки и обезвредили<br />
                вредителей. Но это только начало — у каждого из<br />
                них есть секретное досье.
              </div>
            </div>
            <div
              onClick={() => {
                localStorage.setItem('monsterTimer', seconds.toString())
                router.push('/monster')
              }}
              style={{
                position: 'absolute',
                left: '1180px',
                top: '815px',
                width: '246px',
                height: '62px',
                borderRadius: '16px',
                backgroundColor: 'white',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '700',
                color: 'rgba(246, 81, 40, 1)',
                fontFamily: 'Involve, sans-serif',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.2)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              Просмотреть досье
            </div>
          </div>
        )}

        <style jsx global>{`
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          .memory-card:hover:not(.disappearing) { box-shadow: 0 8px 20px rgba(255, 215, 0, 0.4); }
          .sbornik-hover:hover { transform: scale(1.03) translateY(-8px); filter: drop-shadow(0 15px 25px rgba(0, 0, 0, 0.25)); }
          .matched-card-hover { cursor: pointer; }
          .matched-card-hover:hover { transform: scale(1.06) translateY(-10px) !important; box-shadow: 0 12px 35px rgba(255, 215, 0, 0.4); z-index: 100 !important; }
          .memory-card.disappearing { animation: cardPulse 1.8s ease-out forwards; }
          @keyframes cardPulse {
            0% { box-shadow: 0 0 0px rgba(255, 215, 0, 0); }
            100% { box-shadow: 0 0 80px rgba(255, 215, 0, 1); }
          }
          .obez-card { transition: all 1.5s ease-out; }
          .obez-entering { animation: obezSlideIn 1.5s ease-out forwards; }
          .obez-visible { transform: translateX(0) scale(1); opacity: 1; }
          .obez-leaving { animation: obezSlideOut 1.5s ease-in forwards; }
          @keyframes obezSlideIn {
            0% { transform: translateX(-120px) scale(0.6); opacity: 0; }
            100% { transform: translateX(0) scale(1); opacity: 1; }
          }
          @keyframes obezSlideOut {
            0% { transform: translateX(0) scale(1); opacity: 1; }
            100% { transform: translateX(80px) scale(0.6); opacity: 0; }
          }
          .victory-screen {
            position: fixed;
            top: 0; left: 0;
            width: 100vw; height: 100vh;
            background: rgba(225, 98, 26, 1);
            z-index: 200;
            animation: victoryAppear 0.5s ease-out forwards;
          }
          @keyframes victoryAppear {
            0% { opacity: 0; }
            100% { opacity: 1; }
          }
          .papki-hover { cursor: pointer; }
          .papki-hover:hover { transform: translate(-50%, -50%) scale(1.02); filter: drop-shadow(0 15px 30px rgba(0, 0, 0, 0.3)); }
        `}</style>
      </div>
    </div>
  )
}

export default function GamePage() {
  return (
    <Suspense fallback={<div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', background: 'linear-gradient(to right, #FF9449, #F65128)', color: 'white', fontSize: '24px' }}>Загрузка...</div>}>
      <GameContent />
    </Suspense>
  )
}

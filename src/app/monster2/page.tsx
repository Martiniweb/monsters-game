'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Monster2Page() {
  const router = useRouter()
  const [current, setCurrent] = useState(4)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const [animatedDanger, setAnimatedDanger] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const total = 10
  const percentage = (current / total) * 100
  const dangerLevel = 8
  const dangerPercentage = (dangerLevel / 10) * 100

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimatedPercentage(percentage)
    }, 300)
    const timer2 = setTimeout(() => {
      setAnimatedDanger(dangerPercentage)
    }, 500)
    return () => {
      clearTimeout(timer)
      clearTimeout(timer2)
    }
  }, [percentage, dangerPercentage])

  const handleAnswerSelect = (answer: string) => {
    setSelectedAnswer(answer)
  }

  return (
    <div className="page-transition-enter" style={{
      minHeight: '100vh',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: '#f5f5f5'
    }}>
      <div style={{
        width: '1600px',
        height: '900px',
        borderRadius: '42px',
        background: 'linear-gradient(90deg, rgba(255, 148, 73, 1) 0%, rgba(246, 81, 40, 1) 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Белый блок слева */}
        <div style={{
          position: 'absolute',
          left: '50px',
          top: '44px',
          width: '449px',
          height: '812px',
          borderRadius: '28px',
          background: 'linear-gradient(180deg, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 1) 100%)',
          boxShadow: '0px 16px 24px rgba(0, 0, 0, 0.06), 0px 2px 6px rgba(0, 0, 0, 0.04), 0px 0px 1px rgba(0, 0, 0, 0.04)'
        }}>
          {/* Оранжевый блок внутри белого */}
          <div className="hover-orange-block" style={{
            position: 'absolute',
            left: '24px',
            top: '20px',
            width: '402px',
            height: '240px',
            borderRadius: '20px',
            background: 'rgba(255, 153, 58, 1)',
            boxShadow: '0px 10px 30px rgba(255, 153, 58, 0.4)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '26px',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            {/* Блок редкости - дуга с градиентом */}
            <div style={{
              width: '154px',
              height: '154px',
              fontFamily: 'Involve, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <svg width="154" height="154" viewBox="0 0 154 154" style={{ position: 'absolute', transform: 'rotate(90deg)' }}>
                <defs>
                  <linearGradient id="arcGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 51, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 51, 0.1)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="77" cy="77" r="67"
                  fill="none"
                  stroke={current === 10 ? "rgba(255, 255, 51, 1)" : "url(#arcGradient2)"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedPercentage / 100) * 420.97} 420.97`}
                  style={{ transition: 'stroke-dasharray 2s ease-out' }}
                />
              </svg>
              {/* Текст "Редкость" */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '20px'
              }}>
                Редкость
              </div>
              {/* Цифры */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '40px',
                fontWeight: '700',
                letterSpacing: '-0.05em',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '-8px'
              }}>
                {current}/{total}
              </div>
            </div>

            {/* Блок опасности - дуга с градиентом */}
            <div style={{
              width: '154px',
              height: '154px',
              fontFamily: 'Involve, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <svg width="154" height="154" viewBox="0 0 154 154" style={{ position: 'absolute', transform: 'rotate(90deg)' }}>
                <defs>
                  <linearGradient id="dangerGradient2" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 0, 0, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 0, 0, 0.1)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="77" cy="77" r="67"
                  fill="none"
                  stroke={dangerLevel === 10 ? "rgba(255, 0, 0, 1)" : "url(#dangerGradient2)"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedDanger / 100) * 420.97} 420.97`}
                  style={{ transition: 'stroke-dasharray 2s ease-out' }}
                />
              </svg>
              {/* Текст "Опасность" */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '20px'
              }}>
                Опасность
              </div>
              {/* Цифры */}
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '40px',
                fontWeight: '700',
                letterSpacing: '-0.05em',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '-8px'
              }}>
                {dangerLevel}/{total}
              </div>
            </div>
          </div>

          {/* Заголовок Описание */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '290px',
            width: '158px',
            height: '40px',
            opacity: 1,
            fontFamily: 'Involve, sans-serif'
          }}>
            <span style={{
              fontSize: '30px',
              fontWeight: '700',
              letterSpacing: '0px',
              lineHeight: '43.44px',
              color: 'rgba(64, 64, 64, 1)'
            }}>
              Описание
            </span>
          </div>

          {/* Текст описания */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '335px',
            width: '400px',
            height: '175px',
            opacity: 1,
            fontFamily: 'Involve, sans-serif',
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '27.51px',
            color: 'rgba(64, 64, 64, 1)'
          }}>
              Появляется там, где сыро, темно и никто не проветривает. Любит ванные комнаты, углы промерзающих стен и места за мебелью. Опасен тем, что портит отделку и здоровье жильцов (аллергия, кашель), а пахнет так, что хоть нос зажимай.
          </div>

          {/* Заголовок Проблема */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '560px',
            width: '158px',
            height: '40px',
            opacity: 1,
            fontFamily: 'Involve, sans-serif'
          }}>
            <span style={{
              fontSize: '30px',
              fontWeight: '700',
              letterSpacing: '0px',
              lineHeight: '43.44px',
              color: 'rgba(64, 64, 64, 1)'
            }}>
              Проблема
            </span>
          </div>

          {/* Подзаголовок */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '605px',
            width: '400px',
            height: '28px',
            opacity: 1,
            fontFamily: 'Involve, sans-serif',
            fontWeight: 400,
            fontSize: '19px',
            lineHeight: '27.51px',
            color: 'rgba(64, 64, 64, 1)'
          }}>
              Сырость, грибок, аллергия
          </div>
        </div>

        {/* Жёлто-зелёный блок по центру */}
        <div style={{
          position: 'absolute',
          left: '560px',
          top: '44px',
          width: '449px',
          height: '812px',
          borderRadius: '28px',
          background: 'linear-gradient(180deg, rgba(255, 209, 67, 1) 0%, rgba(169, 179, 77, 1) 34.6%, rgba(176, 185, 79, 1) 68.1%, rgba(119, 144, 34, 1) 100%)'
        }}>
          {/* Левая стрелка - активна */}
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '37px',
            width: '28px',
            height: '45px',
            opacity: 1,
            transform: 'scaleX(-1)',
            backgroundImage: 'url(/right.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            cursor: 'pointer',
            transition: 'transform 0.2s ease',
            zIndex: 10
          }}
          onClick={() => router.push('/monster')}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'scaleX(-1) scale(1.1)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleX(-1)'}
          >
          </div>

          {/* Правая стрелка - неактивна */}
          <div style={{
            position: 'absolute',
            right: '30px',
            top: '37px',
            width: '28px',
            height: '45px',
            opacity: 0.3,
            backgroundImage: 'url(/right.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            cursor: 'default',
            zIndex: 10
          }}>
          </div>

          {/* Изображение монстра */}
          <div className="monster-float" style={{
            position: 'absolute',
            left: '-85px',
            top: '-40px',
            width: '622px',
            height: '816px',
            opacity: 1,
            backgroundImage: 'url(/plesenmonstr2.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            zIndex: 1
          }}>
          </div>

          {/* Название монстра */}
          <div style={{
            position: 'absolute',
            left: '172px',
            top: '670px',
            width: '277px',
            height: '117px',
            opacity: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            justifyContent: 'center',
            fontFamily: 'Involve, sans-serif'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: '800',
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 1)'
            }}>
              СКРИПУН
            </span>
            <span style={{
              fontSize: '48px',
              fontWeight: '800',
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 1)'
            }}>
              ПОЛОВИЧ
            </span>
          </div>
        </div>

        {/* Белый блок справа сверху */}
        <div style={{
          position: 'absolute',
          left: '1070px',
          top: '44px',
          width: '449px',
          height: '400px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 1)'
        }}>
          {/* Оранжевый блок */}
          <div className="hover-orange-block" style={{
            position: 'absolute',
            left: '24px',
            top: '20px',
            width: '401px',
            height: '89px',
            borderRadius: '17px',
            background: 'rgba(255, 153, 58, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease'
          }}>
            <span style={{
              fontSize: '30px',
              fontWeight: '700',
              color: 'rgba(255, 255, 255, 1)',
              fontFamily: 'Involve, sans-serif'
            }}>
              Слабые стороны
            </span>
          </div>

          {/* Эллипс под оранжевым блоком */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '145px',
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            background: 'rgba(254, 146, 72, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              backgroundImage: 'url(/icongor.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
            </div>
          </div>

          {/* Текст справа от эллипса */}
          <div style={{
            position: 'absolute',
            left: '90px',
            top: '145px',
            height: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'Involve, sans-serif'
          }}>
            <div style={{
              fontSize: '25px',
              fontWeight: '700',
              color: 'rgba(64, 64, 64, 1)'
            }}>
              Клинья:
            </div>
            <div style={{
              fontSize: '15px',
              fontWeight: '500',
              letterSpacing: '-0.02em',
              color: 'rgba(163, 174, 208, 1)',
              maxWidth: '320px',
              lineHeight: '1.4'
            }}>
              Если забить деревянные клинья, монстр лишается подвижности.
            </div>
          </div>

          {/* Второй эллипс */}
          <div style={{
            position: 'absolute',
            left: '22px',
            top: '240px',
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            background: 'rgba(254, 146, 72, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              backgroundImage: 'url(/icongor.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
            </div>
          </div>

          {/* Текст справа от второго эллипса */}
          <div style={{
            position: 'absolute',
            left: '90px',
            top: '240px',
            height: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'Involve, sans-serif'
          }}>
            <div style={{
              fontSize: '25px',
              fontWeight: '700',
              color: 'rgba(64, 64, 64, 1)'
            }}>
              Саморезы:
            </div>
            <div style={{
              fontSize: '15px',
              fontWeight: '500',
              letterSpacing: '-0.02em',
              color: 'rgba(163, 174, 208, 1)',
              maxWidth: '320px',
              lineHeight: '1.4'
            }}>
              Притянутая к лагам доска не может скрипеть.
            </div>
          </div>

          {/* Третий эллипс */}
          <div style={{
            position: 'absolute',
            left: '22px',
            top: '320px',
            width: '50px',
            height: '50px',
            borderRadius: '25px',
            background: 'rgba(254, 146, 72, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{
              width: '30px',
              height: '30px',
              backgroundImage: 'url(/icongor.png)',
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center'
            }}>
            </div>
          </div>

          {/* Текст справа от третьего эллипса */}
          <div style={{
            position: 'absolute',
            left: '90px',
            top: '320px',
            height: '50px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            fontFamily: 'Involve, sans-serif'
          }}>
            <div style={{
              fontSize: '25px',
              fontWeight: '700',
              color: 'rgba(64, 64, 64, 1)'
            }}>
              Смазка:
            </div>
            <div style={{
              fontSize: '15px',
              fontWeight: '500',
              letterSpacing: '-0.02em',
              color: 'rgba(163, 174, 208, 1)',
              maxWidth: '320px',
              lineHeight: '1.4'
            }}>
              Заставляет монстра «заткнуться».
            </div>
          </div>
        </div>

        {/* Вопрос о бетонной стяжке */}
        <div style={{
          position: 'absolute',
          left: '1070px',
          top: '464px',
          width: '449px',
          height: '105px',
          opacity: 1,
          fontFamily: 'Involve, sans-serif',
          fontSize: '26px',
          fontWeight: '700',
          letterSpacing: '-0.02em',
          color: 'rgba(255, 255, 255, 1)',
          lineHeight: '1.2',
          display: 'flex',
          alignItems: 'center'
        }}>
          Может ли Скрипун Полович появиться в новой квартире с бетонной стяжкой?
        </div>

        {/* Тумблер - вариант ответа А */}
        <div 
          onClick={() => handleAnswerSelect('A')}
          style={{
            position: 'absolute',
            left: '1070px',
            top: '583px',
            width: '56px',
            height: '30.71px',
            borderRadius: '25px',
            background: selectedAnswer === 'A' ? 'rgba(254, 146, 72, 1)' : 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '1.5px',
            transition: 'background 0.2s ease'
          }}>
          {/* Внутренний эллипс (круг) */}
          <div style={{
            width: '27px',
            height: '27px',
            borderRadius: '50%',
            background: selectedAnswer === 'A' ? 'rgba(255, 255, 255, 1)' : 'rgba(254, 146, 72, 1)',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            transform: selectedAnswer === 'A' ? 'translateX(25px)' : 'translateX(0)',
            transition: 'transform 0.2s ease, background 0.2s ease'
          }}>
          </div>
        </div>

        {/* Текст ответа А */}
        <div style={{
          position: 'absolute',
          left: '1137px',
          top: '583px',
          fontFamily: 'Involve, sans-serif',
          fontSize: '19px',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 1)',
          lineHeight: '1.4',
          display: 'flex',
          alignItems: 'center',
          height: '30.71px'
        }}>
          Да, он вездесущ и может жить даже в бетоне.
        </div>

        {/* Тумблер - вариант ответа Б */}
        <div 
          onClick={() => handleAnswerSelect('B')}
          style={{
            position: 'absolute',
            left: '1070px',
            top: '628px',
            width: '56px',
            height: '30.71px',
            borderRadius: '25px',
            background: selectedAnswer === 'B' ? '#FFFF33' : 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '1.5px',
            transition: 'background 0.2s ease'
          }}>
          {/* Внутренний эллипс (круг) */}
          <div style={{
            width: '27px',
            height: '27px',
            borderRadius: '50%',
            background: selectedAnswer === 'B' ? 'rgba(255, 255, 255, 1)' : 'rgba(254, 146, 72, 1)',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            transform: selectedAnswer === 'B' ? 'translateX(25px)' : 'translateX(0)',
            transition: 'transform 0.2s ease, background 0.2s ease'
          }}>
          </div>
        </div>

        {/* Текст ответа Б */}
        <div style={{
          position: 'absolute',
          left: '1137px',
          top: '628px',
          fontFamily: 'Involve, sans-serif',
          fontSize: '19px',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 1)',
          lineHeight: '1.4',
          display: 'flex',
          alignItems: 'center',
          height: '30.71px'
        }}>
          Нет, ему нужны деревянные конструкции.
        </div>

        {/* Тумблер - вариант ответа В */}
        <div 
          onClick={() => handleAnswerSelect('C')}
          style={{
            position: 'absolute',
            left: '1070px',
            top: '673px',
            width: '56px',
            height: '30.71px',
            borderRadius: '25px',
            background: selectedAnswer === 'C' ? 'rgba(254, 146, 72, 1)' : 'rgba(255, 255, 255, 1)',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            padding: '1.5px',
            transition: 'background 0.2s ease'
          }}>
          {/* Внутренний эллипс (круг) */}
          <div style={{
            width: '27px',
            height: '27px',
            borderRadius: '50%',
            background: selectedAnswer === 'C' ? 'rgba(255, 255, 255, 1)' : 'rgba(254, 146, 72, 1)',
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
            transform: selectedAnswer === 'C' ? 'translateX(25px)' : 'translateX(0)',
            transition: 'transform 0.2s ease, background 0.2s ease'
          }}>
          </div>
        </div>

        {/* Текст ответа В */}
        <div style={{
          position: 'absolute',
          left: '1137px',
          top: '668px',
          fontFamily: 'Involve, sans-serif',
          fontSize: '19px',
          fontWeight: '400',
          color: 'rgba(255, 255, 255, 1)',
          lineHeight: '1.4',
          maxWidth: '400px'
        }}>
          Только если в стяжке есть трещина, тогда он превращается в Гулбетона.
        </div>

        {/* Блок с правильным ответом - появляется после выбора */}
        {selectedAnswer && (
          <div style={{
            position: 'absolute',
            left: '1070px',
            top: '735px',
            width: '530px',
            fontFamily: 'Involve, sans-serif',
            fontSize: '15px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 1)',
            lineHeight: '1.5'
          }}>
            <span style={{ fontWeight: '600', color: '#FFFF33' }}>Правильный ответ:</span> Нет, ему нужны деревянные конструкции.
            <div style={{ height: '4px' }}></div>
            <span style={{ fontWeight: '600' }}>Пояснение:</span> Скрипун Полович водится исключительно в деревянных перекрытиях. В бетонной стяжке живут другие монстры, например Гулбетон Громыхалыч, который появляется из-за неровностей и пустот.
          </div>
        )}
      </div>

      <style jsx global>{`
        .monster-float {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .hover-orange-block:hover {
          transform: translateY(-5px) scale(1.02);
          box-shadow: 0px 15px 40px rgba(255, 153, 58, 0.5) !important;
        }
      `}</style>
    </div>
  )
}

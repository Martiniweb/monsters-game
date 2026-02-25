'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

// Данные монстров
const monsters = [
  {
    id: 1,
    name: 'СКРИПУН ПОЛОВИЧ',
    nameLine1: 'СКРИПУН',
    nameLine2: 'ПОЛОВИЧ',
    rarity: 5,
    danger: 3,
    image: '/skripun.png',
    description: 'Обитает в старых деревянных полах и паркете. Активируется в тишине, особенно по ночам. Любит пугать домочадцев внезапными пронзительными звуками. Скрипун не опасен для жизни, но доводит до нервного тика и мешает выспаться.',
    problem: 'Скрип, дискомфорт',
    weaknesses: [
      { title: 'Клинья:', desc: 'Если забить деревянные клинья, монстр лишается подвижности.' },
      { title: 'Саморезы:', desc: 'Притянутая к лагам доска не может скрипеть.' },
      { title: 'Смазка:', desc: 'Заставляет монстра «заткнуться».' }
    ],
    quiz: {
      question: 'Может ли Скрипун Полович появиться в новой квартире с бетонной стяжкой?',
      answers: [
        { text: 'Да, он вездесущ и может жить даже в бетоне.', correct: false },
        { text: 'Нет, ему нужны деревянные конструкции.', correct: true },
        { text: 'Только если в стяжке есть трещина, тогда он превращается в Гулбетона.', correct: false }
      ],
      correctAnswer: 'Нет, ему нужны деревянные конструкции.',
      explanation: 'Скрипун Полович водится исключительно в деревянных перекрытиях. В бетонной стяжке живут другие монстры, например Гулбетон Громыхалыч, который появляется из-за неровностей и пустот.'
    }
  },
  {
    id: 2,
    name: 'ПЛЕСЕНЬ ПЛЕСЕНЕВИЧ',
    nameLine1: 'ПЛЕСЕНЬ',
    nameLine2: 'ПЛЕСЕНЕВИЧ',
    rarity: 4,
    danger: 8,
    image: '/plesenmonstr2.png',
    description: 'Появляется там, где сыро, темно и никто не проветривает. Любит ванные комнаты, углы промерзающих стен и места за мебелью. Опасен тем, что портит отделку и здоровье жильцов (аллергия, кашель), а пахнет так, что хоть нос зажимай.',
    problem: 'Сырость, грибок, аллергия',
    weaknesses: [
      { title: 'Грунтовка с антисептиком:', desc: 'Проникает в стены и убивает споры на корню.' },
      { title: 'Гидроизоляция:', desc: 'Если перекрыть ему доступ к воде, он сохнет и исчезает.' },
      { title: 'Концентрат от грибка:', desc: 'Ядерная бомба для плесени.' }
    ],
    quiz: {
      question: 'Может ли Плесень-Плесеневич завестись в новой квартире на первом этаже из-за подвала?',
      answers: [
        { text: 'Нет, в новых квартирах плесени не бывает.', correct: false },
        { text: 'Да, может. Сырость из подвала поднимается по стенам.', correct: true },
        { text: 'Только если в подвале прорвало трубу.', correct: false }
      ],
      correctAnswer: 'Да, может. Сырость из подвала поднимается по стенам.',
      explanation: 'Это называется капиллярный подсос. Влага поднимается по бетону, и если не сделать гидроизоляцию между фундаментом и стенами, плесень появится даже на идеальных стенах.'
    }
  },
  {
    id: 3,
    name: 'КАПАЛЫЧ',
    nameLine1: 'КАПАЛЫЧ',
    nameLine2: '',
    rarity: 6,
    danger: 7,
    image: '/monstr3kapalich.png',
    description: 'Селится обычно в старых смесителях, гибких шлангах или в местах соединения труб. Сначала он просто капает, отвлекая от фильмов, а потом, когда хозяева привыкают, превращает каплю в фонтан. Дружит с соседями снизу, делая им пятна на потолке.',
    problem: 'Протечки, вечно мокрый пол, соседи снизу',
    weaknesses: [
      { title: 'ФУМ-лента:', desc: 'Уплотняет резьбу, чтобы он не просочился.' },
      { title: 'Новый смеситель:', desc: 'Капалыч терпеть не может современную сантехнику.' },
      { title: 'Силиконовый герметик:', desc: 'Запечатывает все щели, оставляя монстра без выхода.' }
    ],
    quiz: {
      question: 'Всегда ли нужно менять кран, если из него капает, или можно просто сильно закрутить?',
      answers: [
        { text: 'Конечно, закрутить покрепче — и всё пройдёт.', correct: false },
        { text: 'Сильно закручивать бесполезно — сотрётся прокладка.', correct: true },
        { text: 'Если капает, кран подлежит только полной замене.', correct: false }
      ],
      correctAnswer: 'Сильно закручивать бесполезно — сотрётся прокладка.',
      explanation: 'Обычно проблема в изношенном картридже или прокладке, которые можно заменить отдельно, не меняя весь смеситель. А если перетянуть — можно сорвать резьбу.'
    }
  },
  {
    id: 4,
    name: 'ГУЛБЕТОН ГРОМЫХАЛЫЧ',
    nameLine1: 'ГУЛБЕТОН',
    nameLine2: 'ГРОМЫХАЛЫЧ',
    rarity: 3,
    danger: 4,
    image: '/gromichalichmonstr4.png',
    description: 'Обитает в бетонных перекрытиях и стенах панельных домов. Ему нравится, когда слышно, как сосед сверху ходит на каблуках, а сосед справа сверлит. Громыхалыч усиливает ударные шумы и передает их по всему дому, лишая жильцов покоя.',
    problem: 'Плохая звукоизоляция, шум от соседей',
    weaknesses: [
      { title: 'Звукоизоляционные плиты:', desc: 'Они гасят вибрацию.' },
      { title: 'Виброподвесы:', desc: 'Специальные крепления, которые не дают звуку передаваться на стены.' },
      { title: 'Плавающий пол:', desc: 'Конструкция, которая не касается стен и плит перекрытия.' }
    ],
    quiz: {
      question: 'Помогут ли тонкие пробковые обои на стене спасти от шума перфоратора соседа?',
      answers: [
        { text: 'Нет, это миф. Обои спасут только от эха.', correct: true },
        { text: 'Да, пробка — лучший звукоизолятор.', correct: false },
        { text: 'Помогут, если наклеить их в три слоя.', correct: false }
      ],
      correctAnswer: 'Нет, это миф. Обои спасут только от эха.',
      explanation: 'Пробковые обои (2-4 мм) не спасают от структурного шума (удары, перфоратор). От таких звуков спасает только изоляция с воздушным зазором и толстым слоем минваты в каркасе.'
    }
  },
  {
    id: 5,
    name: 'ТРЕЩИН ЗИАЮЩИЙ',
    nameLine1: 'ТРЕЩИН',
    nameLine2: 'ЗИАЮЩИЙ',
    rarity: 2,
    danger: 5,
    image: '/tresihnmonstr5.png',
    description: 'Появляется на стенах и потолке, особенно в новостройках или после спешного ремонта. Любит слабые места: стыки гипсокартона, углы дверных проемов и толстые слои штукатурки, которые плохо просохли. Портит внешний вид и навевает тоску.',
    problem: 'Усадка дома, плохая штукатурка',
    weaknesses: [
      { title: 'Армирующая сетка:', desc: 'Вмурованная в шпаклевку сетка не дает трещине ползти дальше.' },
      { title: 'Эластичная шпаклевка:', desc: 'Слегка тянется и не лопается при микродвижениях стен.' },
      { title: 'Стеклохолст:', desc: 'Наклеивается на потолок и держит его, как бронежилет.' }
    ],
    quiz: {
      question: 'Если замазать трещину на стене обычной финишной шпаклевкой, она исчезнет навсегда?',
      answers: [
        { text: 'Конечно, шпаклевка всё заделает.', correct: false },
        { text: 'Нет, если трещина глубокая или дом садится.', correct: true },
        { text: 'Исчезнет, если шпаклевка дорогая.', correct: false }
      ],
      correctAnswer: 'Нет, если трещина глубокая или дом садится.',
      explanation: 'Сначала нужно расшить трещину (расширить и углубить), загрунтовать и заделать специальной штукатуркой или герметиком, а уже потом шпаклевать. Иначе трещина проявится снова.'
    }
  },
  {
    id: 6,
    name: 'ЭНЕРГОМОРОК',
    nameLine1: 'ЭНЕРГОМОРОК',
    nameLine2: '',
    rarity: 7,
    danger: 10,
    image: '/energomormonst6.png',
    description: 'Прячется в старых розетках, скрутках проводов и слабых автоматах в щитке. Любит, когда включают много мощных приборов сразу (чайник + микроволновка + обогреватель). Выбивает пробки, плавит изоляцию и может устроить пожар.',
    problem: 'Короткое замыкание, скачки напряжения',
    weaknesses: [
      { title: 'Автомат. выключатели:', desc: 'Мгновенно отключают линию при перегрузке.' },
      { title: 'УЗО:', desc: 'Ловит даже микро-утечки тока.' },
      { title: 'Кабель нужного сечения:', desc: 'Толстый кабель не греется.' }
    ],
    quiz: {
      question: 'Если при включении пылесоса мигает свет — это нормально?',
      answers: [
        { text: 'Да, просто пылесос мощный.', correct: false },
        { text: 'Нет, это первый звонок — плохой контакт.', correct: true },
        { text: 'Так бывает только в старых домах.', correct: false }
      ],
      correctAnswer: 'Нет, это первый звонок — плохой контакт.',
      explanation: 'Скорее всего, где-то плохой контакт или слабая проводка. Энергоморок уже примеряется, где устроить замыкание. Стоит проверить розетку и щиток.'
    }
  },
  {
    id: 7,
    name: 'ЗАЗОР ЗАЗОРОВИЧ',
    nameLine1: 'ЗАЗОР',
    nameLine2: 'ЗАЗОРОВИЧ',
    rarity: 1,
    danger: 6,
    image: '/zazormonstr8.png',
    description: 'Поселяется в щелях между оконными рамами, дверными коробками и в вентиляции. Зимой он запускает холод, летом — жару и пыль с улицы. Заставляет счета за отопление расти, а жильцов — кутаться в пледы.',
    problem: 'Щели в окнах, дверях, сквозняки, тепло/холод',
    weaknesses: [
      { title: 'Монтажная пена:', desc: 'Заполняет самые глубокие щели.' },
      { title: 'Акриловый герметик:', desc: 'Маскирует мелкие трещины.' },
      { title: 'Уплотнитель:', desc: 'Резиновые ленты.' }
    ],
    quiz: {
      question: 'Можно ли использовать монтажную пену, чтобы заделать щель в полу рядом с батареей?',
      answers: [
        { text: 'Да, можно, но её нужно закрыть.', correct: true },
        { text: 'Нет, пена боится тепла от батареи.', correct: false },
        { text: 'Можно, и ничего больше делать не надо.', correct: false }
      ],
      correctAnswer: 'Да, можно, но её нужно закрыть',
      explanation: 'Пена боится солнечного света (желтеет и разрушается) и огня. Её нужно обязательно обрезать и заштукатурить или закрыть наличником/плинтусом, чтобы Зазорович не вернулся.'
    }
  },
  {
    id: 8,
    name: 'РЫЖИК КОРРОЗИЙНЫЙ',
    nameLine1: 'РЫЖИК',
    nameLine2: 'КОРРОЗИЙНЫЙ',
    rarity: 4,
    danger: 8,
    image: '/rijikmonstr7.8.png',
    description: 'Заводится на любых металлических поверхностях, где поцарапана краска или есть сырость. Сначала появляется рыжим пятнышком, а потом проедает трубу насквозь, устраивая потоп. Особенно любит стальные трубы и радиаторы отопления.',
    problem: 'Ржавчина на металле, трубах, радиаторах',
    weaknesses: [
      { title: 'Нейтрализатор ржавчины:', desc: 'Химия превращает рыжика в прочный грунт.' },
      { title: 'Антикоррозийная эмаль:', desc: 'Создает панцирь.' },
      { title: 'Оцинковка:', desc: 'Этот металл Рыжику не по зубам.' }
    ],
    quiz: {
      question: 'Если покрасить ржавую трубу сверху, не счищая ржавчину, Рыжик исчезнет?',
      answers: [
        { text: 'Да, краска запечатает его навсегда.', correct: false },
        { text: 'Нет, он продолжит есть трубу под краской.', correct: true },
        { text: 'Исчезнет, если краска с антикоррозийными свойствами.', correct: false }
      ],
      correctAnswer: 'Нет, он продолжит есть трубу под краской.',
      explanation: 'Ржавчина будет расползаться под слоем краски. Сначала нужно обработать преобразователем ржавчины или счистить металлической щеткой, а потом уже красить.'
    }
  },
  {
    id: 9,
    name: 'КРИВОРУЧКО ХАЛТУРЩИКОВ',
    nameLine1: 'КРИВОРУЧКО',
    nameLine2: 'ХАЛТУРЩИКОВ',
    rarity: 8,
    danger: 7,
    image: '/krivmonstr7.png',
    description: 'Вселяется в руки мастеров (или самих жильцов), когда те спешат или ленятся. В результате стены — волной, плитка торчит, плинтуса не сходятся в углах, а уровень можно сразу выкинуть. Этот монстр маскирует свою работу кучей раствора и "глаза и так не заметят".',
    problem: 'Криво положенная плитка, неровные стены',
    weaknesses: [
      { title: 'Лазерный уровень:', desc: 'Луч правды не даст ему скрыть кривизну.' },
      { title: 'Правило и отвес:', desc: 'Инструменты, которые показывают все неровности.' },
      { title: 'Плиточные крестики:', desc: 'Они заставляют класть плитку ровно.' }
    ],
    quiz: {
      question: 'Можно ли исправить завал стены в 2 см, просто нанеся больше штукатурки внизу?',
      answers: [
        { text: 'Нет, штукатурка отвалится толстым слоем.', correct: true },
        { text: 'Да, если штукатурка качественная.', correct: false },
        { text: 'Можно, но только в нежилой комнате.', correct: false }
      ],
      correctAnswer: 'Нет, штукатурка отвалится толстым слоем.',
      explanation: 'Больше 1-1,5 см за один раз штукатурить нельзя — поплывет или треснет. Нужно ставить маячки и штукатурить по ним в несколько слоев, либо выравнивать гипсокартоном.'
    }
  },
  {
    id: 10,
    name: 'ПЕРЕСОРТ СКЛАДСКОЙ',
    nameLine1: 'ПЕРЕСОРТ',
    nameLine2: 'СКЛАДСКОЙ',
    rarity: 9,
    danger: 5,
    image: '/peresmontr10.png',
    description: 'Обитает в голове покупателя, когда тот идет в гипермаркет без списка. Подсовывает плитку не того оттенка, краску не той колеровки или заставляет купить 10 мешков смеси там, где нужен был 1.',
    problem: 'Покупка лишнего и неподходящих материалов',
    weaknesses: [
      { title: 'Калькулятор расхода:', desc: 'Поможет точно посчитать материалы.' },
      { title: 'Список покупок:', desc: 'Не даст купить лишнего.' },
      { title: 'Консультант в магазине:', desc: 'Подскажет правильный выбор.' }
    ],
    quiz: {
      question: 'Плитки 20 штук хватит на пол в ванной 4 кв.м, если плитка 60х60 см?',
      answers: [
        { text: 'Да, 20 плиток — это 7,2 м², с запасом хватит.', correct: false },
        { text: 'Нет, надо точно считать площадь и подрезку.', correct: true },
        { text: 'Хватит, если класть без швов.', correct: false }
      ],
      correctAnswer: 'Нет, надо точно считать площадь и подрезку.',
      explanation: 'На 4 м² нужно 12 плиток + запас 10-15% = около 14 штук.'
    }
  }
]

export default function MonsterPage() {
  const router = useRouter()
  const [monsterIndex, setMonsterIndex] = useState(0)
  const [animatedPercentage, setAnimatedPercentage] = useState(0)
  const [animatedDanger, setAnimatedDanger] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [seconds, setSeconds] = useState(0)
  const [correctAnswers, setCorrectAnswers] = useState(0)
  const [answeredMonsters, setAnsweredMonsters] = useState<{ [key: number]: string }>({})
  const [isHydrated, setIsHydrated] = useState(false)
  
  const monster = monsters[monsterIndex]
  const total = 10
  const percentage = (monster.rarity / total) * 100
  const dangerPercentage = (monster.danger / total) * 100

  // Проверка - все ли 10 вопросов отвечены
  useEffect(() => {
    if (isHydrated && Object.keys(answeredMonsters).length === 10) {
      // Сохраняем финальное время
      localStorage.setItem('monsterTimer', seconds.toString())
      // Переходим на страницу результатов
      router.push('/result')
    }
  }, [answeredMonsters, isHydrated, seconds, router])

  // Загрузка из localStorage после гидратации
  useEffect(() => {
    const savedTime = localStorage.getItem('monsterTimer')
    const savedAnswers = localStorage.getItem('correctAnswers')
    const savedIndex = localStorage.getItem('monsterIndex')
    const savedAnswered = localStorage.getItem('answeredMonsters')
    
    if (savedTime) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSeconds(parseInt(savedTime, 10))
    }
    if (savedAnswers) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setCorrectAnswers(parseInt(savedAnswers, 10))
    }
    if (savedIndex) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setMonsterIndex(parseInt(savedIndex, 10))
    }
    if (savedAnswered) {
      const parsed = JSON.parse(savedAnswered)
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setAnsweredMonsters(parsed)
    }
    setIsHydrated(true)
  }, [])

  // Установка selectedAnswer при смене монстра
  useEffect(() => {
    if (!isHydrated) return
    const savedAnswer = answeredMonsters[monsterIndex]
    if (savedAnswer) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedAnswer(savedAnswer)
    } else {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSelectedAnswer(null)
    }
  }, [monsterIndex, isHydrated, answeredMonsters])

  // Таймер - увеличение секунд
  useEffect(() => {
    if (!isHydrated) return
    const interval = setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
    return () => clearInterval(interval)
  }, [isHydrated])

  // Сохранение времени периодически
  useEffect(() => {
    if (!isHydrated) return
    localStorage.setItem('monsterTimer', seconds.toString())
  }, [isHydrated, seconds])

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600)
    const mins = Math.floor((totalSeconds % 3600) / 60)
    const secs = totalSeconds % 60
    return `${hours.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimatedPercentage(0)
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setAnimatedDanger(0)
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
  }, [percentage, dangerPercentage, monsterIndex])

  const handlePrev = () => {
    if (monsterIndex > 0 && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        const newIndex = monsterIndex - 1
        setMonsterIndex(newIndex)
        localStorage.setItem('monsterIndex', newIndex.toString())
        setTimeout(() => setIsTransitioning(false), 50)
      }, 300)
    }
  }

  const handleNext = () => {
    if (monsterIndex < monsters.length - 1 && !isTransitioning) {
      setIsTransitioning(true)
      setTimeout(() => {
        const newIndex = monsterIndex + 1
        setMonsterIndex(newIndex)
        localStorage.setItem('monsterIndex', newIndex.toString())
        setTimeout(() => setIsTransitioning(false), 50)
      }, 300)
    }
  }

  const handleAnswerSelect = (answer: string, isCorrect: boolean) => {
    if (selectedAnswer) return // Уже ответили
    setSelectedAnswer(answer)
    const newAnswered = { ...answeredMonsters, [monsterIndex]: answer }
    setAnsweredMonsters(newAnswered)
    localStorage.setItem('answeredMonsters', JSON.stringify(newAnswered))
    if (isCorrect) {
      const newCount = correctAnswers + 1
      setCorrectAnswers(newCount)
      localStorage.setItem('correctAnswers', newCount.toString())
    }
  }

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
            height: '180px',
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
              width: '130px',
              height: '130px',
              fontFamily: 'Involve, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <svg width="130" height="130" viewBox="0 0 154 154" style={{ position: 'absolute', transform: 'rotate(90deg)' }}>
                <defs>
                  <linearGradient id="arcGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 255, 51, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 255, 51, 0.1)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="77" cy="77" r="67"
                  fill="none"
                  stroke={monster.rarity === 10 ? "rgba(255, 255, 51, 1)" : "url(#arcGradient)"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedPercentage / 100) * 420.97} 420.97`}
                  style={{ transition: 'stroke-dasharray 2s ease-out' }}
                />
              </svg>
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '15px'
              }}>
                Редкость
              </div>
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: '700',
                letterSpacing: '-0.05em',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '-5px'
              }}>
                {monster.rarity}/{total}
              </div>
            </div>

            {/* Блок опасности - дуга с градиентом */}
            <div style={{
              width: '130px',
              height: '130px',
              fontFamily: 'Involve, sans-serif',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative'
            }}>
              <svg width="130" height="130" viewBox="0 0 154 154" style={{ position: 'absolute', transform: 'rotate(90deg)' }}>
                <defs>
                  <linearGradient id="dangerGradient" x1="100%" y1="0%" x2="0%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255, 0, 0, 1)" />
                    <stop offset="100%" stopColor="rgba(255, 0, 0, 0.1)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="77" cy="77" r="67"
                  fill="none"
                  stroke={monster.danger === 10 ? "rgba(255, 0, 0, 1)" : "url(#dangerGradient)"}
                  strokeWidth="10"
                  strokeLinecap="round"
                  strokeDasharray={`${(animatedDanger / 100) * 420.97} 420.97`}
                  style={{ transition: 'stroke-dasharray 2s ease-out' }}
                />
              </svg>
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '12px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '15px'
              }}>
                Опасность
              </div>
              <div style={{
                position: 'relative',
                zIndex: 1,
                textAlign: 'center',
                fontSize: '32px',
                fontWeight: '700',
                letterSpacing: '-0.05em',
                color: 'rgba(255, 255, 255, 1)',
                marginTop: '-5px'
              }}>
                {monster.danger}/{total}
              </div>
            </div>
          </div>

          {/* Заголовок Описание */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '220px',
            width: '158px',
            height: '40px',
            opacity: 1,
            fontFamily: 'Involve, sans-serif'
          }}>
            <span style={{
              fontSize: '20px',
              fontWeight: '700',
              letterSpacing: '0px',
              lineHeight: '28px',
              color: 'rgba(64, 64, 64, 1)'
            }}>
              Описание
            </span>
          </div>

          {/* Текст описания */}
          <div className={`content-fade ${isTransitioning ? 'fade-out' : 'fade-in'}`} style={{
            position: 'absolute',
            left: '24px',
            top: '255px',
            width: '400px',
            height: '175px',
            opacity: 1,
            fontFamily: 'Involve, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '20px',
            color: 'rgba(64, 64, 64, 1)',
            textAlign: 'justify'
          }}>
              {monster.description}
          </div>

          {/* Блок Проблема */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '380px',
            width: '402px',
          }}>
            <div style={{
              fontSize: '20px',
              fontWeight: '700',
              color: 'rgba(64, 64, 64, 1)',
              fontFamily: 'Involve, sans-serif',
              marginBottom: '2px',
              lineHeight: '28px'
            }}>
              Проблема
            </div>
            <div style={{
              fontSize: '14px',
              fontWeight: '400',
              color: 'rgba(100, 100, 100, 1)',
              fontFamily: 'Involve, sans-serif',
              lineHeight: '20px',
              textAlign: 'justify'
            }}>
              {monster.problem}
            </div>
          </div>

          {/* Блок Слабые стороны */}
          <div style={{
            position: 'absolute',
            left: '24px',
            top: '455px',
            width: '402px',
          }}>
            {/* Оранжевый заголовок */}
            <div style={{
              width: '402px',
              height: '60px',
              borderRadius: '14px',
              background: 'rgba(255, 153, 58, 1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '15px'
            }}>
              <span style={{
                fontSize: '24px',
                fontWeight: '700',
                color: 'rgba(255, 255, 255, 1)',
                fontFamily: 'Involve, sans-serif'
              }}>
                Слабые стороны
              </span>
            </div>

            {/* Первая слабость */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '18px',
                background: 'rgba(254, 146, 72, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundImage: 'url(/icongor.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'rgba(64, 64, 64, 1)', fontFamily: 'Involve, sans-serif' }}>
                  {monster.weaknesses[0].title}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(100, 100, 100, 1)', fontFamily: 'Involve, sans-serif', lineHeight: '20px' }}>
                  {monster.weaknesses[0].desc}
                </div>
              </div>
            </div>

            {/* Вторая слабость */}
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '24px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '18px',
                background: 'rgba(254, 146, 72, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundImage: 'url(/icongor.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'rgba(64, 64, 64, 1)', fontFamily: 'Involve, sans-serif' }}>
                  {monster.weaknesses[1].title}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(100, 100, 100, 1)', fontFamily: 'Involve, sans-serif', lineHeight: '20px' }}>
                  {monster.weaknesses[1].desc}
                </div>
              </div>
            </div>

            {/* Третья слабость */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '18px',
                background: 'rgba(254, 146, 72, 1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginRight: '12px',
                flexShrink: 0
              }}>
                <div style={{
                  width: '20px',
                  height: '20px',
                  backgroundImage: 'url(/icongor.png)',
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center'
                }} />
              </div>
              <div>
                <div style={{ fontSize: '20px', fontWeight: '700', color: 'rgba(64, 64, 64, 1)', fontFamily: 'Involve, sans-serif' }}>
                  {monster.weaknesses[2].title}
                </div>
                <div style={{ fontSize: '14px', fontWeight: '400', color: 'rgba(100, 100, 100, 1)', fontFamily: 'Involve, sans-serif', lineHeight: '20px' }}>
                  {monster.weaknesses[2].desc}
                </div>
              </div>
            </div>
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
          {/* Левая стрелка */}
          <div style={{
            position: 'absolute',
            left: '30px',
            top: '37px',
            width: '28px',
            height: '45px',
            opacity: monsterIndex === 0 ? 0.3 : 1,
            transform: 'scaleX(-1)',
            backgroundImage: 'url(/right.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            cursor: monsterIndex === 0 ? 'default' : 'pointer',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            zIndex: 10
          }}
          onClick={handlePrev}
          onMouseEnter={(e) => monsterIndex > 0 && (e.currentTarget.style.transform = 'scaleX(-1) scale(1.1)')}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scaleX(-1)'}
          >
          </div>

          {/* Правая стрелка */}
          <div style={{
            position: 'absolute',
            right: '30px',
            top: '37px',
            width: '28px',
            height: '45px',
            opacity: monsterIndex === monsters.length - 1 ? 0.3 : 1,
            backgroundImage: 'url(/right.png)',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            cursor: monsterIndex === monsters.length - 1 ? 'default' : 'pointer',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            zIndex: 10
          }}
          onClick={handleNext}
          onMouseEnter={(e) => monsterIndex < monsters.length - 1 && (e.currentTarget.style.transform = 'scale(1.1)')}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
          </div>

          {/* Изображение монстра */}
          <div 
            className={`monster-float monster-transition ${isTransitioning ? 'monster-fade-out' : 'monster-fade-in'}`}
            style={{
              position: 'absolute',
              left: monsterIndex === 3 ? '-35px' : '-85px',
              top: monsterIndex === 3 ? '65px' : '-40px',
              width: monsterIndex === 3 ? '520px' : '622px',
              height: monsterIndex === 3 ? '682px' : '816px',
              opacity: 1,
              backgroundImage: `url(${monster.image})`,
              backgroundSize: 'contain',
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              zIndex: 1
            }}>
          </div>

          {/* Название монстра */}
          <div className={`content-fade ${isTransitioning ? 'fade-out' : 'fade-in'}`} style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '670px',
            width: '400px',
            height: '117px',
            opacity: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'Involve, sans-serif'
          }}>
            <span style={{
              fontSize: '48px',
              fontWeight: '800',
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 1)'
            }}>
              {monster.nameLine1}
            </span>
            <span style={{
              fontSize: '48px',
              fontWeight: '800',
              lineHeight: '1',
              color: 'rgba(255, 255, 255, 1)'
            }}>
              {monster.nameLine2}
            </span>
          </div>
        </div>

        {/* Вопрос квиза */}
        <div className={`content-fade ${isTransitioning ? 'fade-out' : 'fade-in'}`} style={{
          position: 'absolute',
          left: '1070px',
          top: '44px',
          width: '449px',
          height: '105px',
          opacity: 1,
          fontFamily: 'Involve, sans-serif',
          fontSize: '20px',
          fontWeight: '700',
          letterSpacing: '0.02em',
          color: 'rgba(255, 255, 255, 1)',
          lineHeight: '1.3',
          display: 'flex',
          alignItems: 'center'
        }}>
          {monster.quiz.question}
        </div>

        {/* Варианты ответов */}
        {monster.quiz.answers.map((answer, index) => {
          const answerKey = String.fromCharCode(65 + index) // A, B, C
          const isCorrect = answer.correct
          return (
            <div key={index}>
              {/* Тумблер */}
              <div 
                onClick={() => handleAnswerSelect(answerKey, isCorrect)}
                style={{
                  position: 'absolute',
                  left: '1070px',
                  top: `${150 + index * 60}px`,
                  width: '56px',
                  height: '30.71px',
                  borderRadius: '25px',
                  background: selectedAnswer === answerKey 
                    ? (isCorrect ? '#FFFF33' : 'rgba(254, 146, 72, 1)') 
                    : 'rgba(255, 255, 255, 1)',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  padding: '1.5px',
                  transition: 'background 0.2s ease',
                  zIndex: 5
                }}>
                <div style={{
                  width: '27px',
                  height: '27px',
                  borderRadius: '50%',
                  background: selectedAnswer === answerKey ? 'rgba(255, 255, 255, 1)' : 'rgba(254, 146, 72, 1)',
                  boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)',
                  transform: selectedAnswer === answerKey ? 'translateX(25px)' : 'translateX(0)',
                  transition: 'transform 0.2s ease, background 0.2s ease'
                }}>
                </div>
              </div>
              
              {/* Текст ответа */}
              <div className={`content-fade ${isTransitioning ? 'fade-out' : 'fade-in'}`} style={{
                position: 'absolute',
                left: '1137px',
                top: `${150 + index * 60}px`,
                fontFamily: 'Involve, sans-serif',
                fontSize: '14px',
                fontWeight: '400',
                color: 'rgba(255, 255, 255, 1)',
                lineHeight: '20px',
                letterSpacing: '0.02em',
                display: 'flex',
                alignItems: 'center',
                height: '30.71px'
              }}>
                {answer.text}
              </div>
            </div>
          )
        })}

        {/* Блок с правильным ответом */}
        {selectedAnswer && (
          <div className={`content-fade fade-in`} style={{
            position: 'absolute',
            left: '1070px',
            top: '340px',
            width: '530px',
            fontFamily: 'Involve, sans-serif',
            fontSize: '14px',
            fontWeight: '400',
            color: 'rgba(255, 255, 255, 1)',
            lineHeight: '20px',
            letterSpacing: '0.02em',
            textAlign: 'justify'
          }}>
            <span style={{ fontWeight: '600', color: '#FFFF33' }}>Правильный ответ:</span> {monster.quiz.correctAnswer}
            <div style={{ height: '12px' }}></div>
            <span style={{ fontWeight: '600' }}>Пояснение:</span> {monster.quiz.explanation}
          </div>
        )}

        {/* Таймер и счётчик */}
        <div style={{
          position: 'absolute',
          left: '1100px',
          top: '550px',
          display: 'flex',
          alignItems: 'center',
          gap: '60px'
        }}>
          {/* Таймер круглый */}
          <div style={{
            width: '180px',
            height: '180px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <svg width="180" height="180" viewBox="0 0 212 212" style={{ position: 'absolute', transform: 'rotate(-90deg)' }}>
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
              <span style={{ fontSize: '16px', fontWeight: '400', color: 'white', fontFamily: 'Involve, sans-serif', marginBottom: '-5px' }}>Таймер</span>
              <span style={{ fontSize: '32px', fontWeight: '700', color: 'white', fontFamily: 'Involve, sans-serif' }}>{formatTime(seconds)}</span>
            </div>
          </div>

          {/* Счётчик правильных ответов */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '180px',
            marginTop: '-10px'
          }}>
            <span style={{ fontSize: '16px', fontWeight: '400', color: 'rgba(255, 255, 255, 1)', fontFamily: 'Involve, sans-serif', marginBottom: '-8px' }}>Правильные ответы</span>
            <span style={{ fontSize: '70px', fontWeight: '700', color: 'rgba(255, 255, 255, 1)', fontFamily: 'Involve, sans-serif', letterSpacing: '-0.05em' }}>{correctAnswers}/10</span>
          </div>
        </div>
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
        
        .content-fade {
          transition: opacity 0.4s ease;
        }
        
        .fade-in {
          opacity: 1;
        }
        
        .fade-out {
          opacity: 0;
        }
        
        .monster-transition {
          transition: opacity 0.5s ease, transform 0.5s ease;
        }
        
        .monster-fade-in {
          opacity: 1;
          transform: scale(1);
        }
        
        .monster-fade-out {
          opacity: 0;
          transform: scale(0.95);
        }
      `}</style>
    </div>
  )
}

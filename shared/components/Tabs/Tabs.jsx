"use client";

import { useState, useEffect, useRef } from "react";
import Container from "../Container/Container";
import styles from "./Tabs.module.css";
import TabArrow from "../Arrow/Arrow";
import { isDragActive } from "framer-motion";

const tabs = [
  {
    id: 1,
    title:
      " Я переживаю, що не пройду відбір через слабку фізичну підготовку. Як перевірити себе та підготуватися?",
    content: (
      <>
        <p>
          Найголовніше – твоя мотивація. Більшість новобранців спочатку не
          підготовлені, але завдяки тренуванням усе можливо. Зосередься на трьох
          речах: мотивація, тренування, харчування.
        </p>
        <br />
        <p>Перевір себе за нормативами:</p>
        <ul className={styles.tabList}>
          <li className={styles.listItem}>Біг 3 км – до 12 хв;</li>
          <li className={styles.listItem}>Підтягування – 15 разів;</li>
          <li className={styles.listItem}>Біг 100 м – 15 секунд.</li>
        </ul>
        <p>
          Якщо щось не встигнеш прокачати, інструктори навчально-тренувального
          центру допоможуть.
        </p>
        <br />
        <p>
          Також у нас є офлайн-програма підготовки для киян та онлайн-формат для
          тих, хто з інших міст. Якщо цікавить – зв’яжися з нами!
        </p>
      </>
    ),
  },
  {
    id: 2,
    title:
      "Я не служив і не знаю, яка посада мені підійде. Як обрати правильний напрям?",
    content: (
      <p>
        По-перше, ніхто не народився військовим, а тим більше – ССОшником.
        По-друге, саме для цього є ССО Рекрутинг, щоб допомогти тобі обрати
        посаду та пройти всі етапи. Кожна людина цінна своїми навичками,
        досвідом і навіть хобі. Ти можеш не вміти тримати в руках зброю, але з
        закритими очима перебирати двигуни, множити чотиризначні числа та знати,
        як добути інтернет з повітря. Розкажи про себе, і ми обов’язково
        знайдемо тобі справу до душі. Але якщо ти хочеш спробувати обрати сам –
        читай наш блог.
      </p>
    ),
  },
  {
    id: 3,
    title:
      "Що робити, якщо я зрозумію, що обрав не ту спеціальність? Чи можна змінити посаду?",
    content: (
      <>
        <p>
          Якщо ти вирішив змінити спеціальність – звернися до командира і чесно
          поясни свою мотивацію. Загалом, змінити посаду можливо, але це
          залежить від рівня твоєї підготовки та потреб підрозділу. Якщо ти
          незамінний фахівець, командування може попросити тебе передати знання
          іншим перед зміною спеціалізації.
        </p>
        <br />
        <p>
          Краще визначитися ще на етапі базової підготовки, адже в кожного
          вкладається багато часу та ресурсів.
        </p>
      </>
    ),
  },
  {
    id: 4,
    title:
      "Які перспективи кар’єрного зростання в ССО? Чи можна стати офіцером, почавши солдатом?",
    content: (
      <>
        <p>
          Кар’єрне зростання в ССО цілком реальне – від солдата до офіцера, але
          цей шлях вимагає наполегливості. Командири зацікавлені в розвитку
          своїх підлеглих, тож готуйся до сотень годин навчань, виїздів на бази
          партнерів і постійного вдосконалення.
        </p>
        <br />
        <p>
          У підрозділі завжди знайдуться ті, хто підтримають, але для успішного
          кар’єрного росту тобі потрібні чесність, відповідальність, лідерські
          якості та відкритість до нових знань.
        </p>
      </>
    ),
  },
  {
    id: 5,
    title:
      "Чи правда, що мене одразу відправлять у бій без підготовки? Скільки часу триває навчання перед виконанням бойових завдань?",
    content: (
      <>
        <p>
          Звісно, ні! Що ти там будеш робити без підготовки? Це ж не по горобцях
          із батькової рушниці стріляти. В ССО підготовка – це святе, спішка тут
          не працює.
        </p>
        <br />
        <p>
          Спочатку 7 тижнів базової загальновійськової підготовки в
          навчально-тренувальному центрі – опануєш усе військове ремесло і
          виживання (дуже корисна штука). Потім – у частину на спеціальну
          підготовку, від 1 до 3 місяців, залежно від фаху.
        </p>
        <br />
        <p>
          А далі – цукерково-букетного періоду не чекай. Якщо ти частина групи,
          твій найважливіший етап тільки починається. Навчишся відчувати
          командира потилицею за 2 км та зчитувати настрій побратимів. Це займе
          від 3 до 6 місяців, тож про бойові завдання поки тільки мрій.
        </p>
      </>
    ),
  },
  {
    id: 6,
    title: "Контракт та мобілізація – що обрати?",
    content: (
      <>
        <p>Що спільного?</p>
        <ul className={styles.tabList}>
          <li className={styles.listItem}>
            Однакове грошове забезпечення та бойові виплати.
          </li>
          <li className={styles.listItem}>
            Деякі громади дають одноразову допомогу (20-50 тис. грн).
          </li>
          <li className={styles.listItem}>
            Демобілізація після набуття права на звільнення.
          </li>
        </ul>
        <br />
        <p>Плюси мобілізації:</p>
        <ul className={styles.tabList}>
          <li className={styles.listItem}>
            Демобілізація після війни (по хвилях).
          </li>
          <li className={styles.listItem}>
            Пільги на штрафи й пені за кредитами (крім іпотеки й авто).
          </li>
        </ul>
        <br />
        <p>Плюси контракту:</p>
        <ul className={styles.tabList}>
          <li className={styles.listItem}>
            Кар’єрне зростання та додаткове навчання.
          </li>
          <li className={styles.listItem}>
            Компенсація за житло (4 000 - 8 000 грн/міс).
          </li>
          <li className={styles.listItem}>
            100 тис. грн. після 1-го і 2-го років служби.
          </li>
          <li className={styles.listItem}>
            Одноразова виплата при підписанні контракту.
          </li>
          <li className={styles.listItem}>50% компенсації на іпотеку.</li>
        </ul>
        <br />
        <p>
          Висновок: контракт – це розвиток і стабільність, мобілізація –
          можливість демобілізації після війни. Вибір за тобою!
        </p>
      </>
    ),
  },
  {
    id: 7,
    title:
      "Чи буде моя служба безпечною для моєї сім’ї, якщо вони залишилися в окупації?",
    content: (
      <>
        <p>
          Безпека твоєї сім’ї – це перше, що хвилює будь-кого, хто хоче
          приєднатися до ССО, і це абсолютно нормально. Але давай відразу
          розставимо все по місцях: твої рідні не стають мішенню автоматично
          тільки тому, що ти вирішив служити. По-перше, ССО – це професійний
          підрозділ, який працює за всіма нормами секретності. Ніхто не буде
          викладати в TikTok твоє фото з підписом "Віталік з 3-ї групи сьогодні
          на завданні". Вся твоя діяльність буде закритою навіть для найближчого
          оточення.
        </p>
        <br />
        <p>
          По-друге, якщо у тебе є родичі на окупованій території, то єдиний
          ризик – це твоя власна необережність у спілкуванні. Мінімум
          інформації, максимум обережності. Головне правило – жодних розмов про
          службу, особливо по телефону або в соцмережах.
        </p>
        <br />
        <p>
          По-третє, якщо ти реально хвилюєшся, то на базовій підготовці тебе
          навчать, як правильно поводитися з комунікацією, що можна казати, а що
          краще залишити при собі. Ну і, звісно, правила інформаційної безпеки –
          твої найкращі друзі.
        </p>
        <br />
        <p>Тому головне – не панікувати</p>
      </>
    ),
  },
  {
    id: 8,
    title:
      "Якщо мене поранять або я отримаю травму, яка підтримка передбачена?",
    content: (
      <>
        <p>
          Якщо ти отримав поранення чи травму – тебе не залишать наодинці.
          Держава та ССО забезпечать медичну допомогу, реабілітацію та грошову
          підтримку.
        </p>
        <br />
        <p>Що передбачено:</p>
        <ul className={styles.tabList}>
          <li className={styles.listItem}>
            Повне лікування та реабілітація – від першого дня й до повного
            відновлення.
          </li>
          <li className={styles.listItem}>
            Фінансова компенсація – залежно від тяжкості травми.
          </li>
          <li className={styles.listItem}>
            Виплати у разі інвалідності – відповідно до законодавства.
          </li>
          <li className={styles.listItem}>
            Соціальний захист для тебе та твоєї родини – якщо втрата
            працездатності серйозна.
          </li>
        </ul>
        <br />
        <p>
          ССО – це в першу чергу ЗГРАЯ, яка своїх не кидає. Ти отримаєш усе
          необхідне, щоб повернутися до служби або впевнено будувати нове життя.
        </p>
      </>
    ),
  },
  {
    id: 9,
    title: "Скільки часу треба, щоб долучитися до ССО",
    content: (
      <>
        <p>
          Процес вступу до ССО не миттєвий, але чітко структурований. Від
          моменту подачі заявки до початку служби проходить близько 2,5 місяців.
        </p>
        <br />
        <p>Як це відбувається:</p>
        <ul className={styles.tabList}>
          <li className={styles.listItem}>
            Подача заявки – сьогодні, прямо зараз.
          </li>
          <li className={styles.listItem}>
            Первинна співбесіда з центром рекрутингу (до 3 днів).
          </li>
          <li className={styles.listItem}>
            Відбір та зустріч із командиром підрозділу (до 7 днів).
          </li>
          <li className={styles.listItem}>
            Оформлення документів, перевірка безпеки, медкомісія (ВЛК) (до 30
            днів).
          </li>
          <li className={styles.listItem}>
            Зарахування до частини та проходження 7-тижневої базової підготовки
            (БЗВП).
          </li>
          <li className={styles.listItem}>
            Повернення в підрозділ та початок служби.
          </li>
        </ul>
        <br />
        <p>Якщо готовий – не зволікай, ССО чекає на тих, хто готовий діяти!</p>
      </>
    ),
  },
];

export default function TabsComponent() {
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const contentContainerRef = useRef(null);
  const tabContentWrapperRef = useRef(null);
  const [paddingContent, setPaddingContent] = useState(0);

  useEffect(() => {
    if (contentContainerRef.current) {
      setPaddingContent(
        tabContentWrapperRef.current.offsetWidth -
          contentContainerRef.current.offsetWidth -
          60
      );
      if (window.innerWidth < 768) {
        setPaddingContent(0);
        return;
      }
    }
  }, []);

  return (
    <Container>
      <h2 className={styles.title}>В нас є відповіді на твої питання</h2>
      <ul className={styles.tabsList}>
        {tabs.map((tab) => (
          <li
            key={tab.id}
            className={styles.tabContainer}
            onClick={() => {
              setActiveTab(tab.id);
              if (activeTab === tab.id) {
                setActiveTab(-1);
                return;
              }
            }}
          >
            <div className={styles.tabTitleWrapper} ref={tabContentWrapperRef}>
              <div className={styles.tabNumber}>0{tab.id}</div>
              <div className={styles.tabTitle} ref={contentContainerRef}>
                {tab.title}
              </div>
              <TabArrow open={activeTab === tab.id} />
            </div>
            <div
              className={
                activeTab === tab.id
                  ? `${styles.tabContentWrapper} ${styles.activeTab}`
                  : styles.tabContentWrapper
              }
            >
              <div
                className={styles.content}
                style={{
                  paddingLeft: `${paddingContent}px`,
                  paddingRight: `${paddingContent * 0.4}px`,
                  marginBottom: activeTab === tab.id ? "28px" : "0",
                }}
              >
                {tab.content}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </Container>
  );
}

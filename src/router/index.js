import { createRouter, createWebHistory } from 'vue-router';
import MainPage from '@/views/MainPageView.vue';
import EventsPage from '@/views/events/EventsPageView.vue';
import EventPage from '@/views/events/EventPageView.vue';
import UnityPage from '@/views/unity/UnityPageView.vue';
import StatutePage from '@/views/unity/StatutePageView.vue';
import PartnersPage from '@/views/unity/PartnersPageView.vue';
import ActivityPage from '@/views/unity/ActivityPageView.vue';
import GalleryPage from '@/views/unity/gallery/GalleryPageView.vue';
import DocsPage from '@/views/unity/DocsPageView.vue';
import GratitudePage from '@/views/unity/GratitudePageView.vue';
import ArchivePage from '@/views/unity/archive/ArchivePageView.vue';
import JournalsPage from '@/views/unity/archive/JournalsPageView.vue';
import CollectionsPage from '@/views/unity/archive/CollectionsPageView.vue';
import RequirementsPage from '@/views/unity/archive/RequirementsPageView.vue';
import EditorsPage from '@/views/unity/archive/EditorsPageView.vue';
import GalleryEventPage from '@/views/unity/gallery/GalleryEventPageView.vue';
import CalendarPage from '@/views/unity/CalendarPageView.vue';
import ContactsPage from '@/views/ContactsPageView.vue';
import NewsPage from '@/views/news/NewsPageView.vue';
import NewsItemPage from '@/views/news/NewsItemView.vue';
import UnitsPage from '@/views/units/UnitsPageView.vue';
import UnitsItem from '@/views/units/UnitsItemPageView.vue';
import StructurePage from '@/views/unity/structure/StructurePageView.vue';
import BureauPage from '@/views/unity/structure/BureauPageView.vue';
import CommissionPage from '@/views/unity/structure/CommissionPageView.vue';
import CouncilPage from '@/views/unity/structure/CouncilPageView.vue';
import LeadersPage from '@/views/unity/structure/LeadersPageView.vue';
import HistoryPage from '@/views/unity/HistoryPageView.vue';
import AgreementPage from '@/views/AgreementPageView.vue';
import InDevPage from '@/views/InDevPageView.vue';
import FestivalPage from '@/views/events/FestivalPageView.vue';
import FestivalYearPage from '@/views/events/FestivalYearPageView.vue';
import ClubsPage from '@/views/clubs/ClubsPageView.vue';
import SearchPage from '@/views/SearchPageView.vue';

const routes = [
  {
    path: '/',
    name: 'main',
    component: MainPage,
    meta: {
      breadCrumb: 'Главная',
      title: '',
    },
  },
  {
    path: '/clubs',
    meta: {
      breadCrumb: 'Клубы',
      title: 'Клубы',
    },
    children: [
      {
        path: '',
        name: 'clubs',
        component: ClubsPage,
        meta: {
          breadCrumb: 'Клубы',
          title: 'Клубы',
        },
      },
      {
        path: 'list',
        name: 'clubs-list',
        component: InDevPage,
        meta: {
          breadCrumb: 'Перечень клубов',
          title: 'Перечень клубов',
        },
      },
      {
        path: 'events',
        name: 'clubs-events',
        component: InDevPage,
        meta: {
          breadCrumb: 'Мероприятия',
          title: 'Мероприятия',
        },
      },
      {
        path: 'assurance',
        name: 'clubs-assurance',
        component: InDevPage,
        meta: {
          breadCrumb: 'Нормативно-правовое обеспечение',
          title: 'Нормативно-правовое обеспечение',
        },
      },
    ],
  },
  {
    path: '/events',
    name: 'events',
    meta: {
      breadCrumb: 'Мероприятия',
      title: 'Мероприятия',
    },
    children: [
      {
        path: '',
        component: EventsPage,
        name: 'events',
        meta: {
          breadCrumb: 'Мероприятия',
          title: 'Мероприятия',
        },
      },
      {
        path: ':id',
        component: EventPage,
        name: 'event',
        meta: {
          breadCrumb: 'Мероприятие',
          title: 'Мероприятие',
        },
      },
      {
        path: 'festivals',
        redirect: '/events',
        name: 'festivals',
        meta: {
          breadCrumb: 'Фестивали',
          title: 'Фестивали',
        },
        children: [
          {
            path: '',
            redirect: '/events',
            name: 'festivals',
            meta: {
              breadCrumb: 'Фестивали',
              title: 'Фестивали',
            },
          },
          {
            path: ':id',
            name: 'festival',
            meta: {
              breadCrumb: 'Фестиваль',
              title: 'Фестиваль',
            },
            children: [
              {
                path: '',
                component: FestivalPage,
                name: 'festival',
                meta: {
                  breadCrumb: 'Фестиваль',
                  title: 'Фестиваль',
                },
              },
              {
                path: ':year',
                component: FestivalYearPage,
                name: 'festiaval-year',
                meta: {
                  breadCrumb: 'Фестиваль год',
                  title: 'Фестиваль год',
                },
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: '/search',
    name: 'search',
    component: SearchPage,
    meta: {
      breadCrumb: 'Поиск',
      title: 'Поиск',
    },
  },
  {
    path: '/agreement',
    name: 'agreement',
    component: AgreementPage,
    meta: {
      breadCrumb: 'Пользовательское соглашение',
      title: 'Пользовательское соглашение',
    },
  },
  {
    path: '/unity',
    name: 'unity',
    meta: {
      breadCrumb: 'Об объединении',
      title: 'Об Объединении',
    },
    children: [
      {
        path: '',
        name: 'unity',
        component: UnityPage,
        meta: {
          breadCrumb: 'Об объединении',
          title: 'Об объединении',
        },
      },
      {
        path: 'statute',
        name: 'statute',
        component: StatutePage,
        meta: {
          breadCrumb: 'Устав объединения',
          title: 'Устав объединения',
        },
      },
      {
        path: 'history',
        name: 'history',
        component: HistoryPage,
        meta: {
          breadCrumb: 'История',
          title: 'История',
        },
      },
      {
        path: 'partners',
        name: 'partners',
        component: PartnersPage,
        meta: {
          breadCrumb: 'Партнеры',
          title: 'Партнеры',
        },
      },
      {
        path: 'structure',
        name: 'structure',
        meta: {
          breadCrumb: 'Руководство',
          title: 'Руководство',
        },
        children: [
          {
            path: '',
            component: StructurePage,
            name: 'structure',
            meta: {
              breadCrumb: 'Руководство',
              title: 'Руководство',
            },
          },
          {
            path: 'bureau',
            name: 'bureau',
            meta: {
              breadCrumb: 'Комитет',
              title: 'Комитет',
            },
            children: [
              {
                path: '',
                component: BureauPage,
                name: 'bureau',
                meta: {
                  breadCrumb: 'Комитет',
                  title: 'Комитет',
                },
              },
              {
                path: 'council',
                component: CouncilPage,
                name: 'council',
                meta: {
                  breadCrumb: 'Попечительский совет',
                  title: 'Попечительский совет',
                },
              },
              {
                path: 'leaders',
                name: 'leaders',
                component: LeadersPage,
                meta: {
                  breadCrumb: 'Руководители отделений',
                  title: 'Руководители отделений',
                },
              },
            ],
          },
          {
            path: 'commission',
            name: 'commission',
            component: CommissionPage,
            meta: {
              breadCrumb: 'Контрольно-ревизионная комиссия',
              title: 'Контрольно-ревизионная комиссия',
            },
          },
        ],
      },
      {
        path: 'activity',
        component: ActivityPage,
        meta: {
          breadCrumb: 'Деятельность',
          title: 'Деятельность',
        },
      },
      {
        path: 'gallery',
        meta: {
          breadCrumb: 'Фотогалерея',
          title: 'Фотогалерея',
        },
        children: [
          {
            path: '',
            component: GalleryPage,
            meta: {
              breadCrumb: 'Фотогалерея',
              title: 'Фотогалерея',
            },
          },
          {
            path: ':id',
            component: GalleryEventPage,
            meta: {
              breadCrumb: '',
              title: '',
            },
          },
        ],
      },
      {
        path: 'docs',
        component: DocsPage,
        meta: {
          breadCrumb: 'Документы',
          title: 'Документы',
        },
      },
      {
        path: 'gratitude',
        component: GratitudePage,
        meta: {
          breadCrumb: 'Благодарности',
          title: 'Благодарности',
        },
      },
      {
        path: 'archive',
        meta: {
          breadCrumb: 'Архив журнала',
          title: 'Архив журнала',
        },
        children: [
          {
            path: '',
            component: ArchivePage,
            meta: {
              breadCrumb: 'Архив журнала',
              title: 'Архив журнала',
            },
          },
          {
            path: 'journals',
            component: JournalsPage,
            meta: {
              breadCrumb: 'Журналы',
              title: 'Журналы',
            },
          },
          {
            path: 'collections',
            component: CollectionsPage,
            meta: {
              breadCrumb: 'Сборники',
              title: 'Сборники',
            },
          },
          {
            path: 'requirements',
            component: RequirementsPage,
            meta: {
              breadCrumb: 'Требованния к авторам',
              title: 'Требованния к авторам',
            },
          },
          {
            path: 'editors',
            component: EditorsPage,
            meta: {
              breadCrumb: 'Редколлегия',
              title: 'Редколлегия',
            },
          },
        ],
      },
      {
        path: 'calendar',
        component: CalendarPage,
        meta: {
          breadCrumb: 'Спортивно-массовые мероприятия',
          title: 'Спортивно-массовые мероприятия',
        },
      },
    ],
  },
  {
    path: '/units',
    meta: {
      breadCrumb: 'Региональные отделения',
      title: 'Региональные отделения',
    },
    children: [
      {
        path: '',
        component: UnitsPage,
        meta: {
          breadCrumb: 'Региональные отделения',
          title: 'Региональные отделения',
        },
      },
      {
        path: ':id',
        component: UnitsItem,
        meta: {
          breadCrumb: '',
          title: '',
        },
      },
    ],
  },
  {
    path: '/contacts',
    component: ContactsPage,
    meta: {
      breadCrumb: 'Контакты',
      title: 'Контакты',
    },
  },
  {
    path: '/news',
    meta: {
      breadCrumb: 'Новости',
      title: 'Новости',
    },
    children: [
      {
        path: '',
        component: NewsPage,
        meta: {
          breadCrumb: 'Новости',
          title: 'Новости',
        },
      },
      {
        path: ':id',
        component: NewsItemPage,
        meta: {
          breadCrumb: 'Новости',
          title: 'Новости',
        },
      },
    ],
  },
  {
    path: '/:catchAll(.*)',
    redirect: '/',
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior() {
    return {
      top: 0,
    };
  },
});

export default router;

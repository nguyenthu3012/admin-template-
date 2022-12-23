// Sidebar imports
import {LocationOnOutlined,PersonOutline, RoomPreferencesOutlined, DashboardOutlined} from '@mui/icons-material';
import { ApexOptions } from 'apexcharts';

// Analytics Cards imports

// Recent Card Imports
import img1 from "../imgs/img1.png";
import img2 from "../imgs/img2.png";
import img3 from "../imgs/img3.png";
import profile from '../imgs/profile.png';
// Sidebar Data
export const SidebarData = [
  {
    icon: DashboardOutlined,
    heading: "Dashboard",
    path: '/'
  },
  {
    icon: PersonOutline,
    heading: "Users",
    path: '/users'

  },
  {
    icon: RoomPreferencesOutlined,
    heading: "Rooms",
    path: '/rooms'
  },
  {
    icon: LocationOnOutlined,
    heading: 'Positions',
    path: '/locations'
  },
];

// Analytics Cards Data
export const cardsData = [
  {
    title: "Users",
    color: {
      backGround: "linear-gradient(180deg, #bb67ff 0%, #c484f3 100%)",
      boxShadow: "0px 10px 20px 0px #e0c6f5",
    },
    barValue: 70,
    value: "25,970",
    png: PersonOutline,
    series: [
      {
        name: "Users",
        data: [31, 40, 28, 51, 42, 109, 100],
      },
    ],
  },
  {
    title: "Rooms",
    color: {
      backGround: "linear-gradient(180deg, #FF919D 0%, #FC929D 100%)",
      boxShadow: "0px 10px 20px 0px #FDC0C7",
    },
    barValue: 80,
    value: "14,270",
    png: RoomPreferencesOutlined,
    series: [
      {
        name: "Rooms",
        data: [10, 100, 50, 70, 80, 30, 40],
      },
    ],
  },
  {
    title: "Positions",
    color: {
      backGround:
        "linear-gradient(rgb(248, 212, 154) -146.42%, rgb(255 202 113) -46.42%)",
      boxShadow: "0px 10px 20px 0px #F9D59B",
    },
    barValue: 60,
    value: "4,270",
    png: LocationOnOutlined,
    series: [
      {
        name: "Positions",
        data: [10, 25, 15, 30, 12, 15, 20],
      },
    ],
  },
];

// Recent Update Card Data
export const UpdatesData = [
  {
    img: img1,
    name: "Andrew Thomas",
    noti: "has ordered Apple smart watch 2500mh battery.",
    time: "25 seconds ago",
  },
  {
    img: img2,
    name: "James Bond",
    noti: "has received Samsung gadget for charging battery.",
    time: "30 minutes ago",
  },
  {
    img: img3,
    name: "Iron Man",
    noti: "has ordered Apple smart watch, samsung Gear 2500mh battery.",
    time: "2 hours ago",
  },
];

// Custom Review
export const data = {
  series: [
    {
      name: "Review",
      data: [10, 50, 30, 90, 40, 120, 100],
    },
  ]
};

export const options: ApexOptions = {
  chart: {
    type: "area",
    height: "auto",
  },

  fill: {
    colors: ["#fff"],
    type: "gradient",
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: "smooth",
    colors: ["#ff929f"],
  },
  tooltip: {
    x: {
      format: "dd/MM/yy HH:mm",
    },
  },
  grid: {
    show: false,
  },
  xaxis: {
    type: "datetime",
    categories: [
      "2018-09-19T00:00:00.000Z",
      "2018-09-19T01:30:00.000Z",
      "2018-09-19T02:30:00.000Z",
      "2018-09-19T03:30:00.000Z",
      "2018-09-19T04:30:00.000Z",
      "2018-09-19T05:30:00.000Z",
      "2018-09-19T06:30:00.000Z",
    ],
  },
  yaxis: {
    show: false
  },
}

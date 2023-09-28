import { BiSolidHomeCircle } from 'react-icons/bi';
import { BsSearch, BsCardChecklist } from 'react-icons/bs';
import { GoPeople } from 'react-icons/go';
import { RiTwitterXFill } from 'react-icons/ri';
import { HiOutlineDotsCircleHorizontal } from 'react-icons/hi';
import {
  AiOutlineBell,
  AiOutlineMail,
  AiOutlineUser,
} from 'react-icons/ai';


export const navSections = [
  {
    title: 'Home',
    icon: <BiSolidHomeCircle/>,
  },
  {
    title: 'Explore',
    icon: <BsSearch />,
  },
  {
    title: 'Notifications',
    icon: <AiOutlineBell />,
  },
  {
    title: 'Messages',
    icon: <AiOutlineMail />,
  },
  {
    title: 'List',
    icon: <BsCardChecklist />,
  },
  {
    title: 'Communities',
    icon: <GoPeople />,
  },
  {
    title: 'Verified',
    icon: <RiTwitterXFill />,
  },
  {
    title: 'Profile',
    icon: <AiOutlineUser />,
  },
  {
    title: 'More',
    icon: <HiOutlineDotsCircleHorizontal />,
  },
];

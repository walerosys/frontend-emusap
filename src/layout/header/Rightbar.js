import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import BellDropdown from './BellDropdown'
import UserActivity from './UserActivity'
import { RightSidebarToggle } from '../../redux/common/actions'
import { MessageSquare } from 'react-feather';

const Rightbar = () => {
  const dispatch = useDispatch();
  const rightSidebarToggle = useSelector(state => state.Common.rightSidebarToggle)
  const mobileRightTog = useSelector(state => state.Common.mobileRightToggle)
  return (
    <div className="nav-right col pull-right right-menu">
      <ul className={`nav-menus ${mobileRightTog ? 'open' : ''}`}>
        <li>
          <BellDropdown />
        </li>
        {/* <li>
          <a
            className="right_side_toggle"
            href="#javascript"
            onClick={() => dispatch(RightSidebarToggle(rightSidebarToggle))}>
            <MessageSquare />
          </a>
        </li> */}
        <li>
          <UserActivity />
        </li>
      </ul>
    </div>
  )
}


export default Rightbar
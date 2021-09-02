import React, { useState } from 'react'
import { Dropdown, DropdownToggle, DropdownMenu } from 'reactstrap';
import { Bell, TrendingDown, X } from 'react-feather';
import '../../assets/css/BellDropdown.css';
import { useSelector } from "react-redux";

const BellDropdown = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggle = () => setDropdownOpen(prevState => !prevState);
  return (
    <Dropdown isOpen={dropdownOpen} toggle={toggle}>
      <DropdownToggle>
        <Bell /><span className="notification badge badge-pill badge-danger f-10">0</span>
      </DropdownToggle>
      <DropdownMenu className="p-0">
        <ul className="notification-dropdown list-group">
          <li className="gradient-primary-1">
            <h6>Notificaciones</h6><span>Tienes 0 notificaciones sin atender</span>
          </li>
          {/* {
                notification.map((item, index) => {
                  return (
                    <li className="list-group-item-action" key={index}>
                      <div className="media">
                        <div className={`notification-icons bg-${item.art_stock === '0.00' ? 'danger' : 'warning'} mr-3`}>{item.art_stock === '0.00' ? <X className="mt-0" /> : <TrendingDown className="mt-0" />}</div>
                        <div className="media-body">
                          <h6>{item.art_nombre} - {item.art_descripcion}</h6>
                          <p className="mb-0">Stock: {item.art_stock} - {item.art_tipo}</p>
                        </div>
                      </div>
                    </li>
                  )
                })
              } */}
          <li className="bg-light txt-dark"><a href="/#">All </a> notification</li>
        </ul>
      </DropdownMenu>
    </Dropdown>
  )
}

export default BellDropdown
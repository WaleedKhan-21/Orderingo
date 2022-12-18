import React from 'react'
import SideMenu from '../SIdeMenu/SideMenu'

export default function SideBar({children}) {
    return (
        <div class="d-none d-lg-block side-menu col-lg-3 col-6">
            <SideMenu />
            {children}
        </div>
    )
}

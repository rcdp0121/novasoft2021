import React from 'react'
import MenuComponent from './menu'
import NavBarComponent from './menuSuperior';




const HomeComponent = () => {


    return (
        <>
            <div id="wrapper">
                <MenuComponent />

                <div id="content-wrapper" className="d-flex flex-column">
                    <div id="content">
                        <NavBarComponent />
                    </div>
                </div>
            </div>


        </>
    )

}


export default HomeComponent

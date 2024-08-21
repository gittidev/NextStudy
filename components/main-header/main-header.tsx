import Link from "next/link"
import logoImg from '@/assets/logo.png'
import classes from './main-header.module.css'
import Image from "next/image"

// 리액트와 달리 img 파일 가져올때 임포트문.src 입력
import NavLink from "./nav-link"


export default  function MainHeader() {

    return (

        <header>
            <Link className={classes.logo} href='/'>
                <Image src={logoImg} alt="fooddish" priority/>
                nextlevel food
            </Link>

        <nav className={classes.nav}>
                <ul>
                <li>
                    <NavLink href={"/meals"}>Browse Meals</NavLink>
                </li>
                <li>
                    <NavLink href={"/community"}>Food Commmunity</NavLink>
                </li>


            </ul>

        </nav>

        </header>
    )

}
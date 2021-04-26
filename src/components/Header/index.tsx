import React, {useContext}from 'react'
import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'
import styles from './styles.module.scss'
import Link from 'next/link'
import {Container} from './styles';
import Switch from 'react-switch';
import { ThemeContext} from 'styled-components';


type Props = {
    toogleTheme(): void
}

const Header: React.FC<Props> = ({toogleTheme}) => {


    const {colors, title } = useContext(ThemeContext)

    const data = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    return (
        <Container>
            <header className={styles.headerContainer}>
                <Link href="/">
                    <a>
                        {title == 'light' ?(
                            <img src="/logo.svg" alt="podcastr"/>
                        ):(
                            <img width={160} src="/logo2.png" alt="podcastr"/>
                        )}
                    </a>
                </Link>
                <p>
                    O melhor para você ouvir sempre
                </p>

                <span>{data}</span>
                <Switch
                className={styles.btn}
                onChange={toogleTheme}
                checked={title === 'dark'}
                checkedIcon={true}
                uncheckedIcon={true}
                height={10}
                width={40}
                handleDiameter={20}
                offColor={colors.primary}
                onColor={colors.secundary}
                offHandleColor="#40F080"
                onHandleColor="#04D361"
                id="day"
                />
                <label htmlFor="day">
                    <img src="/day.svg" alt="dark"/>
                </label>
            </header>
            
        </Container>
    )
}

export default Header;
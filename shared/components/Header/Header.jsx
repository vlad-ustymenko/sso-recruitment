import React from 'react'
import styles from './Header.module.css'

const Header = () => {
	return (
		<div className={styles.container} style={{position: 'absolute', zIndex: 100, fontSize: 24, color: 'white', fontWeight: 600, textAlign: 'center', width: '100%'}}>Header</div>
	)
}

export default Header
import Container from '@/shared/components/Container/Container'
import styles from './VacanciesPreview.module.css'
import React from 'react'
import VacancyCarousel from '@/shared/components/VacancieCarousel/VacancieCarousel'

const VacanciesPrewiev = () => {
	return (
	<>
		<Container>
			<h2 className={styles.title}>Кого ми шукаємо</h2>
			
		</Container>
		<VacancyCarousel/>
	</>
	)
}

export default VacanciesPrewiev
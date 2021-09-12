import styles from '../styles/Card.module.css'



const Card = ({ title, figure }) => {
    return (
        <div className={styles.card}>
            <h4>{title}</h4>
            <p>{figure}</p>
        </div>
    )
}

export default Card
import styles from './PageLoader.module.css'

const PageLoader = () => {
  return (
    <div className={styles.container} data-testid="loader-container">
      <div className={styles.loader} data-testid="loader"></div>
    </div>
  )
}

export default PageLoader

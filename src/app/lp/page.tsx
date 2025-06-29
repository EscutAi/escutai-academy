import styles from '@/styles/page.module.css'; // Importa o CSS

export default function Page() {
  return (
    <div className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.spacer}></div>
        <div className={styles.logo}>
          <img
            src="https://dev-seravat.pantheonsite.io/wp-content/uploads/2025/06/Logo-dourada.png"
            alt="Logo"
          />
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.heading}>
          <h2>
            <span className={styles.destaque2}>
              LIBERTE-SE DA<br />
              IGNORÂNCIA MUSICAL
            </span>
          </h2>
        </div>
        <div className={styles.subheading}>
          <h2>
            <span className={styles.destaque2}>
              Aprenda a tocar o seu instrumento mesmo
              <br />
              sem saber <strong>dó ré mi fá...</strong>
            </span>
          </h2>
        </div>
        <div className={styles.spacer}></div>
        <div className={styles.button}>
          <a href="https://wa.me/5581992853655?text=Ol%C3%A1%2C%20gostaria%20de%20entrar%20na%20EscutAi%20Academy%21">
            Falar com especialista
          </a>
        </div>
      </div>
    </div>
  );
}

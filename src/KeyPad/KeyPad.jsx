import React from 'react'
import styles from './KeyPad.module.css'

export const KeyPad = ({title, subTitle, clickHandler}) => {
  return (
    <>
        <button className={styles.btn} type='button' onClick={() => clickHandler(title)}>
          {title}
          <p className={styles.subTitle}>
            {
              subTitle
            }
          </p>
        </button>
    </>
  )
}

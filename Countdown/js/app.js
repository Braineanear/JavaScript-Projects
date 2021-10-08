let count = 0;

const value = document.querySelector( '#value' );
const btns = document.querySelectorAll( '.btn' );

btns.forEach( ( btn ) => {
  btn.addEventListener( 'click', ( e ) => {
    const classes = e.currentTarget.classList;

    if ( classes.contains( 'decrease' ) ) {
      count--;
    } else if ( classes.contains( 'increase' ) ) {
      count++;
    } else {
      count = 0;
    }

    if ( count > 0 ) {
      value.style.color = 'green';
    } else if ( count < 0 ) {
      value.style.color = 'red';
    } else {
      value.style.color = '#222';
    }

    value.textContent = count;
  } );
} );

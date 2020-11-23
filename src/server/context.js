import React from 'react';

const FirebaseContext = React.createContext();

export default FirebaseContext;

//Convierte cualquier tipo de componente react en un componente con firebase
export const consumerFirebase = Component => props => (
    <FirebaseContext.Consumer>
        {firebase => <Component {...props} firebase={firebase} />}
    </FirebaseContext.Consumer>
)


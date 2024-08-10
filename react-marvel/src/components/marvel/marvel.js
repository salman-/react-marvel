const Marvel = ({id,name,description})=>{
    return(
        <div>
            <div key={id}>
                <div>Name: {name}</div>
                <div>Description: {description}</div>
              </div>
        </div>
    );
}

export default Marvel;
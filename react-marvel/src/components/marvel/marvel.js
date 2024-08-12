
const Marvel = ({ name, thumbnail, id, dataTestid }) => {
    return (

        <div>
            <img
                src={thumbnail}
                alt={name}
                className="img-responsive img-thumbnail"
                data-testid={`marvel-image-${dataTestid}`}
            />
            <h3 data-testid={`marvel-name-${dataTestid}`}>{name}</h3>
        </div>

    );
}

export default Marvel;
import './Loading.css';

function Loading() {
    return (
        <div id="loading">
            <img src={require('./Spinner-1s-200px-Transparent.gif')} />
        </div>
    )
}

export default Loading
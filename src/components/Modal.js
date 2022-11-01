// import ReactDOM from 'react-dom'

export default function Modal({open, children, onClose, modalClass}) {
    
    if (!open) return null

    // return ReactDOM.createPortal(
    return (
        <>
            <div className="modal-overlay"/>
            <div className={`modal ${modalClass}`}>
                {children}
                
                {/* <button onClick={() => {
                    onClose()
                }}>Cancel</button> */}
            </div>
        </>//,
        // document.getElementById('portal')
    )
}
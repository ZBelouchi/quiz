// import ReactDOM from 'react-dom'

export default function Modal({open, children, onClose, modalClass}) {
    const MODAL_STYLES = {
        position: 'fixed',
        top: '50%',
        left:'50%',
        translate: '-50% -50%',
        zIndex: 1000,
        backgroundColor: 'white',
        border: '2px solid black'
    }
    const OVERLAY_STYLES = {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#000000b3',
        zindex: 1000
    }
    
    if (!open) return null

    // return ReactDOM.createPortal(
    return (
        <>
            <div style={OVERLAY_STYLES}/>
            <div style={MODAL_STYLES} className={modalClass}>
                {children}
                
                {/* <button onClick={() => {
                    onClose()
                }}>Cancel</button> */}
            </div>
        </>//,
        // document.getElementById('portal')
    )
}
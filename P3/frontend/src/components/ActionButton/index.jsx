// for rendering the buttons based on reservation state

const ActionButton = ({ state }) => {

    if (state === 'pe'){
        <div class="row m-2 g-3">
        <a class="btn btn-outline-primary btn-block" href="u_ReservationConfirm.html" role="buttom">Approve</a>
        <a class="btn btn-outline-secondary btn-block" href="#" role="buttom">Deny</a>
        </div>
    }


    return    <div class="row m-2 g-3">
    <a class="btn btn-outline-primary btn-block" href="u_ReservationConfirm.html" role="buttom">View</a>
    <a class="btn btn-outline-secondary btn-block" href="#" role="buttom">Contact Host</a>
    </div>

}

export default ActionButton

import React from 'react';
import * as actions from '../../../actions/listingsActions';
import { Link } from 'react-router-dom';
import { RentalManageCard } from './RentalManageCard';
import { RentalManageModal } from './RentalManageModal';
import { ToastContainer, toast } from 'react-toastify';

export class RentalManage extends React.Component {

  constructor() {
    super();

    this.state = {
      userRentals: [],
      errors: [],
      isFetching: false
    }
  }

  componentDidMount() {
    this.setState({isFetching: true});

    actions.getUserRentals().then(
      userRentals => this.setState({userRentals, isFetching: false}),
      errors => this.setState({errors, isFetching: false}))
  }

  renderRentalCards(rentals) {
    return rentals.map((rental, index) =>
     <RentalManageCard modal={<RentalManageModal bookings={rental.bookings}/>}
                       key={index}
                       rental={rental}
                       rentalIndex={index}
                       deleteRentalCb={this.deleteRental} />);
  }

  deleteRental = (rentalId, rentalIndex) => {
    actions.deleteRental(rentalId).then(
      () => this.deleteRentalFromList(rentalIndex),
      errors => toast.error(errors[0].detail))
  }

  deleteRentalFromList = (rentalIndex) => {
    const userRentals = this.state.userRentals.slice();
    userRentals.splice(rentalIndex, 1);

    this.setState({userRentals});
  }

  render() {
    const { userRentals, isFetching } = this.state;

    return (
      <section id='userRentals' style={{marginBottom: '600px'}}>
        <ToastContainer />
        <h1 className='page-title'>My Rentals</h1>
        <div className='row'>
        {this.renderRentalCards(userRentals)}
        </div>
        { !isFetching && userRentals.length === 0 &&
          <div className='alert alert-warning'>
            You dont have any rentals currenty created. Click to add a rental.
            <Link style={{'marginLeft': '10px'}} className='btn btn-rtv' to='/rentals/new'>Create Rental</Link>
          </div>
        }
      </section>
    )
  }
}

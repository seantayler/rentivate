import React from 'react';
import { connect } from 'react-redux';
import RentalMap from './RentalMap';
import Booking from 'components/bookings/Booking';

import { UserGuard } from '../../shared/auth/UserGuard';
import { toUpperCase } from '../../../services/helpers';

import { EditableInput } from '../../shared/editable/EditableInput';
import { EditableText } from '../../shared/editable/EditableText';
import { EditableSelect } from '../../shared/editable/EditableSelect';
import { EditableImage } from '../../shared/editable/EditableImage';

import * as actions from '../../../actions/listingsActions';

class RentalUpdate extends React.Component {

  constructor() {
    super();

    this.state = {
      isAllowed: false,
      isFetching: true
    }
  }

  componentDidMount() {
    // Dispatch action
    const rentalId = this.props.match.params.id;
    this.props.dispatch(actions.fetchRentalById(rentalId));
  }

  componentDidMount() {
    this.verifyRentalOwner();
  }

  updateRental = (rentalData) => {
    const {rental: {_id}, dispatch } = this.props;

    dispatch(actions.updateRental(_id, rentalData));
  }

  resetRentalErrors = () => {
    this.props.dispatch(actions.resetRentalErrors());
  }

  verifyRentalOwner = () => {
    const rentalId = this.props.match.params.id;
    this.setState({isFetching: true});

    return actions.verifyRentalOwner(rentalId).then(
      () => {
        this.setState({isAllowed: true, isFetching: false})
      },
      () => {
        this.setState({isAllowed: false, isFetching: false})
      });
  }

  render() {
    const { rental, errors } = this.props;
    const { isFetching, isAllowed } = this.state;

    if (rental._id) {
      return (
        <UserGuard isAllowed={isAllowed} isFetching={isFetching}>
          <section id='rentalDetails'>
            <div className='upper-section'>
              <div className='row'>
                <div className='col-md-6'>
                  <EditableImage entity={rental}
                                 entityField={'image'}
                                 errors={errors}
                                 updateEntity={this.updateRental}> </EditableImage>
                </div>
                <div className='col-md-6'>
                  <RentalMap location={`${rental.city}, ${rental.street}`} />
                </div>
              </div>
            </div>
          </section>

          <section>
            <div className='details-section'>
              <div className='row'>
                <div className='col-md-8'>
                  <div className='rental'>

                    <EditableSelect entity={rental}
                                    entityField={'category'}
                                    className={`rental-type ${rental.category}`}
                                    updateEntity={this.updateRental}
                                    options={['appliances', 'camping', 'clothing', 'electronics', 'equipment', 'furniture', 'games', 'general', 'household', 'instruments', 'media', 'recreational', 'sporting', 'tools',  'vehicles']}
                                    errors={errors}
                                    resetErrors={this.resetRentalErrors} />
                    <hr></hr>
                    <EditableInput entity={rental}
                                   entityField={'title'}
                                   className={'rental-title'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors}  />

                    <hr></hr>
                    <EditableInput entity={rental}
                                   entityField={'city'}
                                   className={'rental-city'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                   formatPipe={[toUpperCase]}
                                   resetErrors={this.resetRentalErrors} />
                    <hr></hr>
                    <EditableInput entity={rental}
                                   entityField={'street'}
                                   className={'rental-street'}
                                   updateEntity={this.updateRental}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors} />
                    <hr></hr>
                    <EditableText  entity={rental}
                                   entityField={'description'}
                                   className={'rental-description'}
                                   updateEntity={this.updateRental}
                                   rows={6}
                                   cols={50}
                                   errors={errors}
                                   resetErrors={this.resetRentalErrors}  />
                    <hr></hr>
                  </div>
                </div>
                {/* <div className='col-md-4'>
                 <Booking rental={rental} />
                </div> */}
              </div>
            </div>
          </section>
        </UserGuard>
      )
    } else {
      return (
        <h1> Loading... </h1>
        )
    }
  }
}

function mapStateToProps(state) {
  return {
    rental: state.rental.data,
    errors: state.rental.errors
  }
}

export default connect(mapStateToProps)(RentalUpdate)

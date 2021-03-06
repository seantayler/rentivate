import React from 'react';
import { Link } from 'react-router-dom';
import { pretifyDate, toUpperCase } from '../../services/helpers';

export function BookingCard(props) {

  const { booking } = props;

  return (
    <div className="col-md-4">
      <div className="card text-center">
        <div className="card-header">
          {booking.rental ? booking.rental.category + ' - ' + booking.rental.city : 'Deleted Rental'}
        </div>
        <div className="card-block">
          { booking.rental &&
            <div>
              <h4 className="card-title"> {booking.rental.title} </h4>
              {/* <p className="card-text booking-desc">{booking.rental.description}</p> */}
            </div>
          }
          <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">${booking.totalPrice}</span></p>
           { booking.rental &&
              <Link className="btn btn-rtv" to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
           }
        </div>
        <div className="card-footer text-muted">
          Created {pretifyDate(booking.createdAt)}
        </div>
      </div>
    </div>
  )
}

export function PaymentCard(props) {

  const { booking, payment, paymentBtns } = props;

  return (
    <div className="col-md-4 mt-4">
      <div className="card text-center">
        <div className="card-header">
          Booking made by { payment.fromUser.username }
        </div>
        <div className="card-block">
          { booking.rental &&
            <div>
              <h4 className="card-title mt-3"> {booking.rental.title} </h4>
              {/* <p className="card-text booking-desc">{booking.rental.description}</p> */}
            </div>
          }
          <p className="card-text booking-days">{pretifyDate(booking.startAt)} - {pretifyDate(booking.endAt)} | {booking.days} days</p>
          <p className="card-text booking-price"><span>Price: </span> <span className="booking-price-value">${(payment.amount / 100).toFixed(2)} </span></p>
          <p className="card-text payment-status">Status: {payment.status}</p>
           { booking.rental &&
              <Link className="btn btn-rtv mb-4" style={{color: 'white'}} to={`/rentals/${booking.rental._id}`}>Go to Rental</Link>
           }
        </div>
        <div className="card-footer text-muted">
          Created {pretifyDate(booking.createdAt)}
          { payment.status === 'pending' && paymentBtns && paymentBtns(payment) }
        </div>
      </div>
    </div>
  )
}

import React from 'react'
import TableRow from './TableRow'

export default function ReviewTable({ reviews }) {

    return (

        <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
            <table className="table table-sm">
                {/* head */}
                <thead>
                    <tr>
                        <th>
                            #
                        </th>
                        <th>User</th>
                        <th>Ratings</th>
                        <th>Comment</th>
                        <th>Target ID</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    {
                        reviews?.map((review, index) =>
                            <TableRow key={index} review={review} index={index} />

                        )
                    }
                </tbody>
            </table>
        </div>

    )
}

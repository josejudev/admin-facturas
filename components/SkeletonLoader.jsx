import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const SkeletonLoader = () => {
    return (
        <div>
            <div className="flex justify-center items-center text-center">
                <table className="m-10">
                    <thead>
                        <tr>
                            <th>
                                <Skeleton width={430} />
                            </th>
                            <th>
                                <Skeleton width={430} />
                            </th>
                            <th>
                                <Skeleton width={430} />
                            </th>
                            <th>
                                <Skeleton width={430} />
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <Skeleton width={250} />
                            </td>
                            <td>
                                <Skeleton width={250} />
                            </td>
                            <td>
                                <Skeleton width={250} />
                            </td>
                            <td>
                                <Skeleton width={250} />
                            </td>

                        </tr>
                        <tr>
                            <td>
                                <Skeleton width={250} />
                            </td>
                            <td>
                                <Skeleton width={250} />
                            </td>
                            <td>
                                <Skeleton width={250} />
                            </td>
                            <td>
                                <Skeleton width={250} />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <Skeleton width={100} />
                            </td>
                            <td>
                                <Skeleton width={100} />
                            </td>
                            <td>
                                <Skeleton width={100} />
                            </td>
                            <td>
                                <Skeleton width={100} />
                            </td>
                        </tr>

                        <td>
                            <Skeleton width={100} />
                        </td>
                        <td>
                            <Skeleton width={100} />
                        </td>
                        <td>
                            <Skeleton width={100} />
                        </td>
                        <td>
                            <Skeleton width={100} />
                        </td>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default SkeletonLoader

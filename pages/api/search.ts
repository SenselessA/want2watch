import type { NextApiRequest, NextApiResponse } from 'next'

const KODIK_URL = 'https://kodikapi.com/';

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const reqData = JSON.parse(req.body);

	const dataWithToken = {
		token: process.env.KODIK_API_KEY,
		...reqData.data
	}

	const requestUrl = KODIK_URL + reqData.url + new URLSearchParams(dataWithToken)

	const response = await fetch(requestUrl)

	const data: any = await response.json();

	if (data) {
		res.status(200).json(data)
	} else {
		res.status(data.status).json(data);
	}
}
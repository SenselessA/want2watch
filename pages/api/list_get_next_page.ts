import type { NextApiRequest, NextApiResponse } from 'next'

const KODIK_URL = 'https://kodikapi.com/';

export default async (req: NextApiRequest, res: NextApiResponse) => {

	const nextPage = JSON.parse(req.body).next_page;

	const searchParams = new URLSearchParams({
		token: process.env.KODIK_API_KEY,
		page: nextPage
	})

	const requestUrl = KODIK_URL + 'list?' + searchParams;

	/*console.log('REQUEST URL', requestUrl);*/

	const response = await fetch(requestUrl)

	const data: any = await response.json();

	data.next_page = new URLSearchParams(data.next_page).get('page');
	delete data.prev_page;

	if (data) {
		res.status(200).json(data)
	} else {
		res.status(data.status).json(data);
	}
}
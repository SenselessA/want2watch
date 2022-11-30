import type { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
	const response = await fetch(
		JSON.parse(req.body).url
	)

	const data: any = await response.json();

	if (data) {
		res.status(200).json(data)
	}
}
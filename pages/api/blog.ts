// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { parse } from "node-html-parser";

type Data = {
  result: any;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  try {
    const blogData = req.body;
    const emailBody = blogData.ArticleBody;
    const root = parse(emailBody, {
      blockTextElements: { script: true, style: true, pre: false },
    });
    const body = root.getElementsByTagName("body")[0];
    // body.set_content(body.innerHTML);
    // body.insertAdjacentHTML(
    //   "afterbegin",
    //   root.getElementsByTagName("style")[0].toString()
    // );
    blogData.ArticleBody = `${body.innerHTML}`;
    blogData.ArticleBody = encodeURIComponent(blogData.ArticleBody);

    return res.status(200).send({ result: blogData.ArticleBody });
  } catch (error: any) {
    console.log(error);
    res.status(400).send(error);
  }
}

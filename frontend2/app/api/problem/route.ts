import axios from "axios";

interface IProblemParams {
  params: {
    slug: string;
  };
}

export async function GET(request: Request, { params }: IProblemParams) {
  const slug = params.slug;
  const response = await axios.get(
    `http://localhost:4000/api/public/problems/solutions/${slug}`,
  );
  const data = response.data;
  return {
    props: {
      problemData: data,
    },
  };
}

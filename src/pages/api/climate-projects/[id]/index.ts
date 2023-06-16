import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { errorHandlerMiddleware } from 'server/middlewares';
import { climateProjectValidationSchema } from 'validationSchema/climate-projects';
import { HttpMethod, convertMethodToOperation, convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  await prisma.climate_project
    .withAuthorization({
      roqUserId,
      tenantId: user.tenantId,
      roles: user.roles,
    })
    .hasAccess(req.query.id as string, convertMethodToOperation(req.method as HttpMethod));

  switch (req.method) {
    case 'GET':
      return getClimateProjectById();
    case 'PUT':
      return updateClimateProjectById();
    case 'DELETE':
      return deleteClimateProjectById();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getClimateProjectById() {
    const data = await prisma.climate_project.findFirst(convertQueryToPrismaUtil(req.query, 'climate_project'));
    return res.status(200).json(data);
  }

  async function updateClimateProjectById() {
    await climateProjectValidationSchema.validate(req.body);
    const data = await prisma.climate_project.update({
      where: { id: req.query.id as string },
      data: {
        ...req.body,
      },
    });

    return res.status(200).json(data);
  }
  async function deleteClimateProjectById() {
    const data = await prisma.climate_project.delete({
      where: { id: req.query.id as string },
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(handler)(req, res);
}

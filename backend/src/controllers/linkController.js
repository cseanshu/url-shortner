const { PrismaClient } = require('@prisma/client');
const { isValidUrl, isValidCode, generateRandomCode } = require('../utils/validateUrls');

const prisma = new PrismaClient();

async function createLink(req, res) {
  try {
    const { targetUrl, customCode } = req.body;

    if (!targetUrl) {
      return res.status(400).json({ error: 'Target URL is required' });
    }

    if (!isValidUrl(targetUrl)) {
      return res.status(400).json({ error: 'Invalid URL format' });
    }

    let code;
    if (customCode) {
      if (!isValidCode(customCode)) {
        return res.status(400).json({
          error: 'Custom code must be 6-8 alphanumeric characters'
        });
      }
      code = customCode;
    } else {
      code = generateRandomCode();
    }
    const existingLink = await prisma.link.findUnique({
      where: { code }
    });

    if (existingLink) {
      return res.status(409).json({
        error: 'Code already exists. Please choose a different code.'
      });
    }
    const link = await prisma.link.create({
      data: {
        code,
        targetUrl
      }
    });

    return res.status(201).json({
      success: true,
      data: {
        id: link.id,
        code: link.code,
        targetUrl: link.targetUrl,
        clicks: link.clicks,
        createdAt: link.createdAt,
        updatedAt: link.updatedAt,
        lastClickedAt: link.lastClickedAt
      }
    });

  } catch (error) {
    console.error('Error creating link:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getAllLinks(req, res) {
  try {
    const { search } = req.query;

    let links;
    if (search) {
      links = await prisma.link.findMany({
        where: {
          OR: [
            { code: { contains: search, mode: 'insensitive' } },
            { targetUrl: { contains: search, mode: 'insensitive' } }
          ]
        },
        orderBy: { createdAt: 'desc' }
      });
    } else {
      links = await prisma.link.findMany({
        orderBy: { createdAt: 'desc' }
      });
    }

    return res.status(200).json({
      success: true,
      data: links
    });

  } catch (error) {
    console.error('Error fetching links:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function getLinkStats(req, res) {
  try {
    const { code } = req.params;

    const link = await prisma.link.findUnique({
      where: { code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    return res.status(200).json({
      success: true,
      data: link
    });

  } catch (error) {
    console.error('Error fetching link stats:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function deleteLink(req, res) {
  try {
    const { code } = req.params;

    const link = await prisma.link.findUnique({
      where: { code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    await prisma.link.delete({
      where: { code }
    });

    return res.status(200).json({
      success: true,
      message: 'Link deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting link:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

async function redirectToTarget(req, res) {
  try {
    const { code } = req.params;

    const link = await prisma.link.findUnique({
      where: { code }
    });

    if (!link) {
      return res.status(404).json({ error: 'Link not found' });
    }

    await prisma.link.update({
      where: { code },
      data: {
        clicks: { increment: 1 },
        lastClickedAt: new Date()
      }
    });

    return res.redirect(302, link.targetUrl);

  } catch (error) {
    console.error('Error redirecting:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  createLink,
  getAllLinks,
  getLinkStats,
  deleteLink,
  redirectToTarget
};

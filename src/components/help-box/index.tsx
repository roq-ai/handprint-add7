import React from 'react';
import {
  Box,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Text,
  UnorderedList,
  ListItem,
  Link,
} from '@chakra-ui/react';
import { FiInfo } from 'react-icons/fi';
import { useSession } from '@roq/nextjs';

export const HelpBox: React.FC = () => {
  const ownerRoles = ['Sustainability Consultant'];
  const roles = ['End Customer', 'Sustainability Consultant', 'Business Owner'];
  const applicationName = `handprint `;
  const tenantName = `Organization`;
  const githubUrl = process.env.NEXT_PUBLIC_GITHUB_URL;
  const userStories = `Title: Sustainability Consultant creates an Organization
As a Sustainability Consultant,
I want to create an Organization,
So that I can measure and manage its environmental impact.

Title: Sustainability Consultant adds Business Owner to Organization
As a Sustainability Consultant,
I want to invite a Business Owner to join the Organization,
So that they can collaborate on improving the company's environmental impact.

Title: Business Owner accepts invitation to join Organization
As a Business Owner,
I want to accept the invitation to join the Organization,
So that I can collaborate with the Sustainability Consultant on improving my company's environmental impact.

Title: Sustainability Consultant measures Organization's environmental impact
As a Sustainability Consultant,
I want to measure the Organization's environmental impact (CO2 emissions and biodiversity),
So that I can identify areas for improvement and suggest climate projects.

Title: Sustainability Consultant suggests climate projects for Organization
As a Sustainability Consultant,
I want to suggest climate projects for the Organization,
So that the Business Owner can choose projects to mitigate their company's negative impact.

Title: Business Owner selects climate projects for Organization
As a Business Owner,
I want to select climate projects for my Organization,
So that I can take action to mitigate my company's negative environmental impact.

Title: Sustainability Consultant tracks Organization's progress on climate projects
As a Sustainability Consultant,
I want to track the Organization's progress on selected climate projects,
So that I can monitor the improvements in their environmental impact.

Title: End Customer views Organization's environmental impact and climate projects
As an End Customer,
I want to view an Organization's environmental impact and climate projects,
So that I can make informed decisions about supporting businesses that prioritize sustainability.`;

  const { session } = useSession();
  if (!process.env.NEXT_PUBLIC_SHOW_BRIEFING || process.env.NEXT_PUBLIC_SHOW_BRIEFING === 'false') {
    return null;
  }
  return (
    <Box width={1} position="fixed" left="30px" bottom="20px" zIndex={3}>
      <Popover placement="top-end">
        <PopoverTrigger>
          <IconButton
            aria-label="Help Info"
            icon={<FiInfo />}
            bg="blue.800"
            color="white"
            _hover={{ bg: 'blue.800' }}
            _active={{ bg: 'blue.800' }}
            _focus={{ bg: 'blue.800' }}
          />
        </PopoverTrigger>
        <PopoverContent w="50vw" h="70vh">
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverHeader>App Briefing</PopoverHeader>
          <PopoverBody overflowY="auto">
            <Text mb="2">Hi there!</Text>
            <Text mb="2">
              Welcome to {applicationName}, your freshly generated B2B SaaS application. This in-app briefing will guide
              you through your application.
            </Text>
            <Text mb="2">You can use {applicationName} with one of these roles:</Text>
            <UnorderedList mb="2">
              {roles.map((role) => (
                <ListItem key={role}>{role}</ListItem>
              ))}
            </UnorderedList>
            {session?.roqUserId ? (
              <Text mb="2">You are currently logged in as a {session?.user?.roles?.join(', ')}.</Text>
            ) : (
              <Text mb="2">
                Right now, you are not logged in. The best way to start your journey is by signing up as{' '}
                {ownerRoles.join(', ')} and to create your first {tenantName}.
              </Text>
            )}
            <Text mb="2">
              {applicationName} was generated based on these user stories. Feel free to try them out yourself!
            </Text>
            <Box mb="2" whiteSpace="pre-wrap">
              {userStories}
            </Box>
            <Text mb="2">
              If you are happy with the results, then you can get the entire source code here:{' '}
              <Link href={githubUrl} color="cyan.500" isExternal>
                {githubUrl}
              </Link>
            </Text>
            <Text mb="2">
              Console Dashboard: For configuration and customization options, access our console dashboard. Your project
              has already been created and is waiting for your input. Check your emails for the invite.
            </Text>
            <Text mb="2">
              <Link href="https://console.roq.tech" color="cyan.500" isExternal>
                ROQ Console
              </Link>
            </Text>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  );
};

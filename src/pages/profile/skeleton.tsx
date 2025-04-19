import {
  Card,
  GridItem,
  Group,
  InputAddon,
  Separator,
  SimpleGrid,
  Stack,
} from '@chakra-ui/react'
import React from 'react'
import { FiInstagram } from 'react-icons/fi'

import { SectionBody } from '@/components/section'
import { TextInput } from '@/components/text-input'
import { Field } from '@/components/ui/field'
import { Skeleton, SkeletonText } from '@/components/ui/skeleton'

export function ProfileSkeleton() {
  return (
    <SectionBody>
      <Card.Root borderColor="zinc.200">
        <Card.Header>
          <Card.Title
            as="div"
            backgroundColor="purple.50"
            color="purple.950"
            borderRadius="l3"
            padding="5"
            display="flex"
            justifyContent="center"
          >
            <Skeleton height="7" width="fit-content" loading>
              CNPJ: XXXXXXXXXXXXXXXX
            </Skeleton>
          </Card.Title>
        </Card.Header>

        <Card.Body spaceY="10">
          <Stack gap="4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Field
                key={index}
                label={
                  <SkeletonText noOfLines={1} width="28" loading>
                    Label
                  </SkeletonText>
                }
              >
                <Skeleton width="full" loading>
                  <TextInput />
                </Skeleton>
              </Field>
            ))}

            <SimpleGrid columns={{ base: 1, md: 6 }} gap="4">
              {Array.from({ length: 3 }).map((_, index) => (
                <GridItem key={index} colSpan={{ base: 1, md: 2 }}>
                  <Field
                    label={
                      <SkeletonText noOfLines={1} width="28" loading>
                        Label
                      </SkeletonText>
                    }
                  >
                    <Skeleton width="full" loading>
                      <TextInput />
                    </Skeleton>
                  </Field>
                </GridItem>
              ))}
            </SimpleGrid>

            <Field
              label={
                <SkeletonText noOfLines={1} width="28" loading>
                  Label
                </SkeletonText>
              }
            >
              <Skeleton width="full" loading>
                <TextInput />
              </Skeleton>
            </Field>
          </Stack>

          <Separator borderColor="zinc.200" />

          <Stack gap="4">
            <SimpleGrid columns={{ base: 1, md: 4 }} gap="4">
              {Array.from({ length: 2 }).map((_, index) => (
                <React.Fragment key={index}>
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <Field
                      label={
                        <SkeletonText noOfLines={1} width="28" loading>
                          Label
                        </SkeletonText>
                      }
                    >
                      <Skeleton width="full" loading>
                        <TextInput />
                      </Skeleton>
                    </Field>
                  </GridItem>

                  <GridItem colSpan={{ base: 1, md: 3 }}>
                    <Field
                      label={
                        <SkeletonText noOfLines={1} width="28" loading>
                          Label
                        </SkeletonText>
                      }
                    >
                      <Skeleton width="full" loading>
                        <TextInput />
                      </Skeleton>
                    </Field>
                  </GridItem>
                </React.Fragment>
              ))}
            </SimpleGrid>

            <SimpleGrid columns={{ base: 1, md: 6 }} gap="4">
              {Array.from({ length: 3 }).map((_, index) => (
                <GridItem key={index} colSpan={{ base: 1, md: 2 }}>
                  <Field
                    label={
                      <SkeletonText noOfLines={1} width="28" loading>
                        Label
                      </SkeletonText>
                    }
                  >
                    <Skeleton width="full" loading>
                      <TextInput />
                    </Skeleton>
                  </Field>
                </GridItem>
              ))}
            </SimpleGrid>
          </Stack>

          <Separator borderColor="zinc.200" />

          <Field
            label={
              <SkeletonText noOfLines={1} width="28" loading>
                Label
              </SkeletonText>
            }
          >
            <Skeleton loading>
              <Group attached>
                <InputAddon>
                  <FiInstagram />
                </InputAddon>
                <TextInput />
              </Group>
            </Skeleton>
          </Field>
        </Card.Body>
      </Card.Root>
    </SectionBody>
  )
}

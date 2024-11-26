import { Box, Typography } from '@material-ui/core'
import Image from 'components/generic/Image'
import Markdown from 'components/generic/Markdown'
import PageHeader from 'components/generic/PageHeader'
import PageWrapper from 'components/layouts/PageWrapper'
import React from 'react'

export default () => {
    return (
        <div className="tw-flex tw-flex-col tw-gap-20">
            <PageHeader
                alignment="left"
                heading={'Side-Challenge'}
                subheading={'TEN + X, X = 0 ~ 4 by TEN Framework'}
            />
            <PageWrapper>
                <div className="tw-flex tw-flex-col tw-gap-10">
                    <div className="tw-flex tw-flex-col tw-gap-2">
                        <Typography variant="h6">Hosted by</Typography>
                        <div className="tw-flex tw-flex-col md:tw-flex-row tw-gap-4">
                            <Image
                                url={
                                    'https://res.cloudinary.com/hackjunction/image/upload/v1730880900/event-specific/Junction%202024/agora.png'
                                }
                                alt={'Agora logo'}
                            ></Image>
                            <Image
                                url={
                                    'https://res.cloudinary.com/hackjunction/image/upload/v1730880900/event-specific/Junction%202024/RTE.png'
                                }
                                alt={'RTE logo'}
                            ></Image>
                            <Image
                                url={
                                    'https://res.cloudinary.com/hackjunction/image/upload/v1730880900/event-specific/Junction%202024/Supersonic.png'
                                }
                                alt={'Supersonic logo'}
                            ></Image>
                        </div>
                    </div>
                    <Markdown
                        source={`*Mission:*

### Enable your realtime agent with TEN Framework
 
The TEN Framework is an open-source framework that enables developers to quickly build real-time multimodal agents (voice, video, data stream, image and text).

*To participate in this challenge:*

Your solution must make use of the TEN framework and when creating your project you will be able to indicate that your project is participating on this challenge

With TEN Framework, you can build your own agent enabled, e.g. thinking like gpt-o1, not only listening but also see in realtime, access to your own knowledge, a digital clone, etc.

The targeted scenarios can be:
- 7/24 customer support: knows the customer better than you, and communicate using customers' favor
- Concierge: not only have conversation but also take actions
- Language learning: knows all language and correct you if you want with patience
- Gaming: solo game or multi-player game with AI players or AI NPCs

*Any scenario that you can think of the realtime AI can leverage...*
 
TEN Framework currently has multiple useful extensions with different abilities: LLM, STT, TTS, RAG-related and even voice-to-voice model. You can also build your own extension with your business logic or your favorite model or cloud services.

*Get started:*
https://agent.theten.ai
https://github.com/TEN-framework/ten_framework
https://discord.gg/VnPftUzAMJ

For more information:
https://medium.com/@ten-framework/meet-ten-the-worlds-first-truly-real-time-multimodal-agent-framework-for-creating-next-gen-ai-23e8234c71ed

`}
                    />
                </div>
                <Box paddingBottom={40} />
            </PageWrapper>
        </div>
    )
}

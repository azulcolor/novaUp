import React from 'react';
import Image from 'next/image';
import { CustomButton } from '@/components/CustomInputs/CustomButton';
import { IPost } from '@/interfaces';

interface Props {
    post: IPost;
}

export default function CarouselCard({ post }: Props) {
    return (
        <div className="cardcarousel">
            <div className="cardcarousel__body">
                <div>
                    <div className="cardcarousel__title">{post.title}</div>
                    <div className="cardcarousel__summary">
                        <p>{post.summary}</p>
                    </div>
                </div>
                <div className="cardcarousel__button">
                    <CustomButton
                        title={'Ver detalles'}
                        handleClick={() => { }}
                        containerStyles="btn-primary"
                    />
                </div>
            </div>
            <div className="cardcarousel__image">
                <Image
                    src={post.coverImage || '/assets/images/logo.png'}
                    alt="logo"
                    width={500}
                    height={480}
                />
            </div>
        </div>
    );
}
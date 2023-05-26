<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Post;
use App\Entity\User;

#[Route('/api', name: 'api_')]
class PostController extends AbstractController
{
    #[Route('/post', name: 'post_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $posts = $doctrine
            ->getRepository(Post::class)
            ->findAll();

        $data = [];

        foreach ($posts as $post) {
            $data[] = [
                'id' => $post->getId(),
                'title' => $post->getTitle(),
                'body' => $post->getBody(),
                'user' => [
                    'id' => $post->getUser()->getId(),
                    'username' => $post->getUser()->getUsername(),
                ],
            ];
        }

        return $this->json($data);
    }

    #[Route('/post', name: 'post_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $jsonData = json_decode($request->getContent(), true);

        $title = $jsonData['title'];
        $body = $jsonData['body'];
        $userId = $jsonData['user_id'];

        $post = new Post();
        // $post->setTitle($request->request->get('title'));
        // $post->setBody($request->request->get('body'));
        $post->setTitle($title);
        $post->setBody($body);
        // $userId = $request->request->get('user_id');
        $user = $entityManager->getRepository(User::class)->find($userId);
        if (!$user) {
            return $this->json('Can no add post cause no user found with id  ' . $userId, 404);
        }

        $post->setUser($user);

        $entityManager->persist($post);
        $entityManager->flush();

        return $this->json('Created new post successfully with id ' . $post->getId());
    }

    #[Route('/post/{id}', name: 'post_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $post = $doctrine->getRepository(Post::class)->find($id);

        if (!$post) {
            return $this->json('No post found for id ' . $id, 404);
        }

        $data = [
            'id' => $post->getId(),
            'title' => $post->getTitle(),
            'body' => $post->getBody(),
            'user' => [
                'id' => $post->getUser()->getId(),
                'username' => $post->getUser()->getUsername(),
            ],
        ];

        return $this->json($data);
    }

    #[Route('/post/{id}', name: 'post_edit', methods: ['PUT'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $post = $entityManager->getRepository(Post::class)->find($id);

        $jsonData = json_decode($request->getContent(), true);

        $title = $jsonData['title'];
        $body = $jsonData['body'];

        if (!$post) {
            return $this->json('No post found for id ' . $id, 404);
        }

        // $post->setTitle($request->request->get('title'));
        // $post->setBody($request->request->get('body'));
        $post->setTitle($title);
        $post->setBody($body);
        $entityManager->flush();

        $data = [
            'id' => $post->getId(),
            'title' => $post->getTitle(),
            'body' => $post->getBody(),
            'user' => [
                'id' => $post->getUser()->getId(),
                'username' => $post->getUser()->getUsername(),
            ],
        ];

        return $this->json($data);
    }

    #[Route('/post/{id}', name: 'post_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $post = $entityManager->getRepository(Post::class)->find($id);

        if (!$post) {
            return $this->json('No user found for id ' . $id, 404);
        }

        $entityManager->remove($post);
        $entityManager->flush();

        return $this->json('Deleted a post successfully with id ' . $id);
    }
}

<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

use Symfony\Component\HttpFoundation\Response;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Comment;
use App\Entity\Post;
use App\Entity\User;

#[Route('/api', name: 'api_')]
class CommentController extends AbstractController
{
    #[Route('/comment', name: 'comment_index', methods: ['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $comments = $doctrine
            ->getRepository(Comment::class)
            ->findAll();
  
        $data = [];
  
        foreach ($comments as $comment) {
            $data[] = [
                'id' => $comment->getId(),
                'body' => $comment->getBody(),
                'user' => [
                    'id' => $comment->getUser()->getId(),
                    'username' => $comment->getUser()->getUsername(),
                ],
                'post' => [
                    'id' => $comment->getPost()->getId(),
                    'title' => $comment->getPost()->getTitle(),
                    'user' => [
                        'id' => $comment->getPost()->getUser()->getId(),
                        'username' => $comment->getPost()->getUser()->getUsername(),
                    ],
                ],
            ];
        }
  
        return $this->json($data);
    }
    
    #[Route('/comment', name: 'comment_new', methods: ['POST'])]
    public function new(ManagerRegistry $doctrine, Request $request): Response
    {
        $entityManager = $doctrine->getManager();

        $jsonData = json_decode($request->getContent(), true);

        $body = $jsonData['body'];
        $userId = $jsonData['user_id'];
        $postId = $jsonData['post_id'];

        $comment = new Comment();
        // $comment->setBody($request->request->get('body'));
        $comment->setBody($body);

        // $userId = $request->request->get('user_id');
        $user = $entityManager->getRepository(User::class)->find($userId);
        if (!$user) {
            return $this->json('Can no add comment cause no user found with id  ' . $userId, 404);
        }

        // $postId = $request->request->get('post_id');
        $post = $entityManager->getRepository(Post::class)->find($postId);
        if (!$post) {
            return $this->json('Can no add comment cause no post found with id  ' . $postId, 404);
        }
    
        $comment->setUser($user);
        $comment->setPost($post);

        $entityManager->persist($comment);
        $entityManager->flush();
  
        return $this->json('Created new comment successfully with id ' . $comment->getId());
    }
  
    #[Route('/comment/{id}', name: 'comment_show', methods: ['GET'])]
    public function show(ManagerRegistry $doctrine, int $id): Response
    {
        $comment = $doctrine->getRepository(Comment::class)->find($id);
  
        if (!$comment) {
            return $this->json('No comment found for id ' . $id, 404);
        }

        $data = [
            'id' => $comment->getId(),
            'body' => $comment->getBody(),
            'user' => [
                'id' => $comment->getUser()->getId(),
                'username' => $comment->getUser()->getUsername(),
            ],
            'post' => [
                'id' => $comment->getPost()->getId(),
                'title' => $comment->getPost()->getTitle(),
                'user' => [
                    'id' => $comment->getPost()->getUser()->getId(),
                    'username' => $comment->getPost()->getUser()->getUsername(),
                ],
            ],
        ];
          
        return $this->json($data);
    }
  
    #[Route('/comment/{id}', name: 'comment_edit', methods: ['PUT'])]
    public function edit(ManagerRegistry $doctrine, Request $request, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $comment = $entityManager->getRepository(Comment::class)->find($id);
  
        if (!$comment) {
            return $this->json('No comment found for id ' . $id, 404);
        }

        $jsonData = json_decode($request->getContent(), true);

        $body = $jsonData['body'];
  
        // $comment->setBody($request->request->get('body'));
        $comment->setBody($body);

        $entityManager->flush();
  
        $data = [
            'id' => $comment->getId(),
            'body' => $comment->getBody(),
            'user' => [
                'id' => $comment->getUser()->getId(),
                'username' => $comment->getUser()->getUsername(),
            ],
        ];
          
        return $this->json($data);
    }
  
    #[Route('/comment/{id}', name: 'comment_delete', methods: ['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response
    {
        $entityManager = $doctrine->getManager();
        $comment = $entityManager->getRepository(Comment::class)->find($id);
  
        if (!$comment) {
            return $this->json('No user found for id ' . $id, 404);
        }
  
        $entityManager->remove($comment);
        $entityManager->flush();
  
        return $this->json('Deleted a comment successfully with id ' . $id);
    }
}

